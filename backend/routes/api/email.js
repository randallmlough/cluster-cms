const express = require('express');
const router = express.Router();
const {google} = require('googleapis');
const passport = require('passport');
const Contact = require('../../models/Contact');
const MailComposer = require("nodemailer/lib/mail-composer");

const validateEmailInput = require('../../validation/email');

const clientId = require('../../config/keys').google.clientId,
  clientSecret = require('../../config/keys').google.clientSecret,
  redirectUrl = require('../../config/keys').google.redirectUrl;

const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUrl
);

google.options({
  auth: oauth2Client
});

const parseGData = gRes => {
  let data = gRes.data.payload.body.data;
  
  if (data) {
    gRes.data.payload.body.data = 
      Buffer.from(data, "base64").toString("ascii");
  } else {
    parseGParts(gRes.data.payload.parts);
  }
  
  data = {};

  data.id = gRes.data.id;

  gRes.data.payload.headers
    .filter(h => (
    ["Date", "From", "To", "Subject"].includes(h.name)
  )).forEach(h => {
    data[h.name.toLowerCase()] = h.value;
  });

  data.labels = gRes.data.labelIds;

  switch (gRes.data.payload.mimeType) {
    case "text/plain":
      data.body = gRes.data.payload.body.data;
      break;
    case "multipart/mixed":
    case "multipart/related":
      gRes.data.payload.parts[0].parts &&
        (data.body = gRes.data.payload.parts[0].parts[0].body.data,
        data.formattedBody = gRes.data.payload.parts[0].parts[1].body.data)
      break;
    case "multipart/alternative":
      data.body = gRes.data.payload.parts[0].body.data;
      data.formattedBody = gRes.data.payload.parts[1].body.data;
      break;
    case "text/html":
      data.formattedBody = gRes.data.payload.body.data;
      break;
    default:
      console.log(`ERROR: Unknown type ${gRes.data.payload.mimeType}`);
      break;
  }

  gRes.data = data;
  return gRes;
};

const parseGParts = parts => {
  parts.forEach(p => {
    if (p.body.size === 0) {
      parseGParts(p.parts);
    } else {
      if (!p.body.data) return;
      let newData = Buffer.from(p.body.data, "base64").toString("ascii");
      p.body.data = newData;
    }
  });
}

router.use(
  passport.authenticate('jwt', {session: false}),
  (req, res, next) => {
    if (!req.user.gmailId) {
      return res.status(400).json({user: "Missing user's gmail ID"});
    }

    oauth2Client.setCredentials({
      access_token: req.user.accessToken,
      refresh_token: req.user.refreshToken
    });

    next();
  }
);

router.get("/",
  (req, res) => {
    const params = {
      userId: req.user.gmailId
    };

    if (req.query.q) params.q = req.query.q;
    if (req.query.nextPageToken) params.pageToken = req.query.nextPageToken;
    
    Contact.find({
      ownerId: req.user.id
    })
      .then(contacts => {
        if (params.q) {
          params.q += "";
        } else {
          if (contacts.length === 0) {
            params.q = "from:null";
          } else {
            let query = "{";
            contacts.forEach(c => query += `from:${c.email} to:${c.email} `);
            query += "}";
            params.q = query;
          }
        }
        
        const gmail = google.gmail({version: "v1", oauth2Client});
        gmail.users.messages.list(params, (err, gRes) => {
          if (err) return console.log(err);
          if (gRes.data.resultSizeEstimate === 0) return res.json([]);
          res.json(gRes.data.messages);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
);

router.get("/:id",
  (req, res) => {
    const params = {
      userId: req.user.gmailId,
      id: req.params.id,
      format: "full"
    };

    const gmail = google.gmail({version: "v1", oauth2Client});
    gmail.users.messages.get(params, (err, gRes) => {
      if (err) return res.status(400).json({ok: false});
      parseGData(gRes);
      res.json(gRes.data);
    });
});

router.post("/",
  (req, res) => {
    const { errors, isValid } = validateEmailInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const mailOptions = {
      to: req.body.to,
      subject: req.body.subject,
      text: req.body.body
    },
      mail = new MailComposer(mailOptions),
      params = {
        userId: req.user.gmailId
      };

    mail.compile().build((err,msg) => {
      if (err) return console.log(err);
      params.resource = {raw: msg.toString("base64")};
      
      const gmail = google.gmail({version: "v1", oauth2Client});
      gmail.users.messages.send(params, (err, gRes) => {
        if (err) return console.log(err);
        gmail.users.messages.get({
          userId: req.user.gmailId,
          id: gRes.data.id
        }, (err, gRes) => {
          parseGData(gRes);
          res.json(gRes.data);
        })
      });
    });
  }
);

module.exports = router;
