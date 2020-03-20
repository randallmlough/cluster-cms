const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const passport = require('passport');
const Contact = require('../../models/Contact');
const MailComposer = require('nodemailer/lib/mail-composer');

const validateEmailInput = require('../../validation/email');

const clientId = require('../../config/keys').google.clientId,
  clientSecret = require('../../config/keys').google.clientSecret,
  redirectUrl = require('../../config/keys').google.redirectUrl,
  credentials = require('../../config/keys').google.credentials;

const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUrl
);

google.options({
  auth: oauth2Client,
});

const parseGData = gRes => {
  let data = gRes.data.payload.body.data;

  if (data) {
    gRes.data.payload.body.data = Buffer.from(data, 'base64').toString('ascii');
  } else {
    parseGParts(gRes.data.payload.parts);
  }

  data = {};

  data.id = gRes.data.id;

  gRes.data.payload.headers
    .filter(h => ['Date', 'From', 'To', 'Subject'].includes(h.name))
    .forEach(h => {
      data[h.name.toLowerCase()] = h.value;
    });

  data.labels = gRes.data.labelIds;

  switch (gRes.data.payload.mimeType) {
    case 'text/plain':
      data.body = gRes.data.payload.body.data;
      break;
    case 'multipart/mixed':
    case 'multipart/related':
      gRes.data.payload.parts[0].parts &&
        ((data.body = gRes.data.payload.parts[0].parts[0].body.data),
        (data.formattedBody = gRes.data.payload.parts[0].parts[1].body.data));
      break;
    case 'multipart/alternative':
      data.body = gRes.data.payload.parts[0].body.data;
      data.formattedBody = gRes.data.payload.parts[1].body.data;
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
      let newData = Buffer.from(p.body.data, 'base64').toString('ascii');
      p.body.data = newData;
    }
  });
};

router.use(
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    if (!req.user.gmailId) {
      return res.status(400).json({ user: "Missing user's gmail ID" });
    }

    oauth2Client.setCredentials({
      access_token: req.user.accessToken,
      refresh_token: req.user.refreshToken,
    });

    next();
  }
);

router.get('/', (req, res) => {
  const params = {
    userId: req.user.gmailId,
  };

  if (req.query.q) params.q = req.query.q;
  if (req.query.nextPageToken) params.pageToken = req.query.nextPageToken;

  Contact.find({
    ownerId: req.user.id,
  })
    .then(contacts => {
      if (params.q) {
        params.q += '';
      } else {
        if (contacts.length === 0) {
          params.q = 'from:null';
        } else {
          let query = '{';
          contacts.forEach(c => (query += `from:${c.email} to:${c.email} `));
          query += '}';
          params.q = query;
        }
      }

      const gmail = google.gmail({ version: 'v1', oauth2Client });
      gmail.users.messages.list(params, (err, gRes) => {
        if (err) return console.log(err);
        if (gRes.data.resultSizeEstimate === 0) return res.json([]);
        res.json(gRes.data.messages);
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/:id', (req, res) => {
  const params = {
    userId: req.user.gmailId,
    id: req.params.id,
    format: 'full',
  };

  const gmail = google.gmail({ version: 'v1', oauth2Client });
  gmail.users.messages.get(params, (err, gRes) => {
    if (err) return res.status(400).json({ ok: false });
    parseGData(gRes);
    res.json(gRes.data);
  });
});

router.post('/', (req, res) => {
  const { errors, isValid } = validateEmailInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  const mailOptions = {
      to: req.body.to,
      subject: req.body.subject,
      text: req.body.body,
    },
    mail = new MailComposer(mailOptions),
    params = {
      userId: req.user.gmailId,
    };

  mail.compile().build((err, msg) => {
    if (err) return console.log(err);
    params.resource = { raw: msg.toString('base64') };

    const gmail = google.gmail({ version: 'v1', oauth2Client });
    gmail.users.messages.send(params, (err, gRes) => {
      if (err) return console.log(err);
      gmail.users.messages.get(
        {
          userId: req.user.gmailId,
          id: gRes.data.id,
        },
        (err, gRes) => {
          parseGData(gRes);
          res.json(gRes.data);
        }
      );
    });
  });
});

router.post('/schedule', (req, res) => {
  const { errors, isValid } = validateEmailInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  const { to, subject, body, date } = req.body;
  const { gmailId, accessToken, refreshToken } = req.user;

  const payload = {
    to,
    subject,
    text: body,
    gmail_id: gmailId,
    access_token: accessToken,
    refresh_token: refreshToken
  };
  createHttpTaskWithToken(payload, date).then(
    resp => {
      res.json(resp);
    }
  );
});

const {ErrorReporting} = require('@google-cloud/error-reporting');
const errors = new ErrorReporting({
  credentials,
  reportMode: "always",
  projectId: "aa-cluster-cms"
});

const MAX_SCHEDULE_LIMIT = 30 * 60 * 60 * 24;

const createHttpTaskWithToken = async function(
  payload = 'Hello, World!', // The task HTTP request body
  date = new Date(), // Intended date to schedule task
  project = 'aa-cluster-cms', // Your GCP Project id
  queue = 'cluster-cms-tasks', // Name of your Queue
  location = 'us-central1', // The GCP region of your queue
  url = 'https://us-central1-aa-cluster-cms.cloudfunctions.net/cluster-email-sender', // The full url path that the request will be sent to
  email = 'email-scheduler@aa-cluster-cms.iam.gserviceaccount.com' // Cloud IAM service account
) {
  // Imports the Google Cloud Tasks library.
  const { v2beta3 } = require('@google-cloud/tasks');

  // Instantiates a client.
  const client = new v2beta3.CloudTasksClient({
    credentials
  });

  // Construct the fully qualified queue name.
  const parent = client.queuePath(project, location, queue);
  console.log('PARENT', parent);

  // Convert message to buffer.
  const convertedPayload = JSON.stringify(payload);
  const body = Buffer.from(convertedPayload).toString('base64');

  const task = {
    httpRequest: {
      httpMethod: 'POST',
      url,
      headers: {
        'Content-Type': 'application/json'
      },
      body
    },
  };

  const convertedDate = new Date(date);
  const currentDate = new Date();

  // Schedule time can not be in the past.
  if (convertedDate < currentDate) {
    console.error('Scheduled date in the past.');
  } else if (convertedDate > currentDate) {
    console.log('VALID DATE');
    const date_diff_in_seconds = (convertedDate - currentDate) / 1000;
    // Restrict schedule time to the 30 day maximum.
    if (date_diff_in_seconds > MAX_SCHEDULE_LIMIT) {
      console.error('Schedule time is over 30 day maximum.');
    }
    // Construct future date in Unix time.
    const date_in_seconds =
      Math.min(date_diff_in_seconds, MAX_SCHEDULE_LIMIT) + Date.now() / 1000;
    // Add schedule time to request in Unix time using Timestamp structure.
    // https://googleapis.dev/nodejs/tasks/latest/google.protobuf.html#.Timestamp
    task.scheduleTime = {
      seconds: date_in_seconds,
    };
  }

  try {
    // Send create task request.
    const [response] = await client.createTask({ parent, task });
    console.log(`Created task ${response.name}`);
    return response.name;
  } catch (error) {
    // Construct error for Stackdriver Error Reporting
    errors.report(error);
    console.error(Error(error.message));
  }
};

module.exports = router;
