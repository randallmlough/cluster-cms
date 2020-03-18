const express = require("express");
const router = express.Router();
const {google} = require('googleapis');
const passport = require('passport');
const Contact = require('../../models/Contact');
const MailComposer = require("nodemailer/lib/mail-composer");

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

    if (req.params.query) params.q = req.params.query;
    if (req.params.nextPageToken) params.pageToken = req.params.nextPageToken;

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
          res.json(gRes.data);
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
      if (err) return console.log(err);
      
      let data = gRes.data.payload.body.data,
        newPayload = [];
      
      if (data) {
        gRes.data.payload.body.data = 
          Buffer.from(data, "base64").toString("ascii");
      } else {
        gRes.data.payload.parts.forEach(p => {
          let newData = Buffer.from(p.body.data, "base64").toString("ascii");
          newPayload.push(newData);
        })
        gRes.data.payload.parts = newPayload;
      }

      res.json(gRes.data);
    });
});

router.post("/",
  (req, res) => {
    const mailOptions = {
      to: req.body.email.to,
      subject: req.body.email.subject,
      text: req.body.email.body
    },
      mail = new MailComposer(mailOptions),
      params = {
        userId: req.user.gmailId
      };

    mail.compile().build((err,msg) => {
      params.body = msg.toString("base64");
      // console.log(msg.toString("base64"));
      const gmail = google.gmail({version: "v1", oauth2Client});
      gmail.users.messages.send(params, (err, gRes) => {
        if (err) return console.log(err);
        console.log("ok")
        console.log(gRes);
      })
    });
  }
);

module.exports = router;
