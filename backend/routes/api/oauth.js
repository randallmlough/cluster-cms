const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {google} = require('googleapis');
const User = require('../../models/User');

const clientId = require('../../config/keys').google.clientId,
  clientSecret = require('../../config/keys').google.clientSecret,
  redirectUrl = require('../../config/keys').google.redirectUrl,
  secretOrKey = require('../../config/keys').secretOrKey;

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  "openid"
];

const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUrl
);

google.options({
  auth: oauth2Client
});

router.get("/", async (req, res) => {
  const {tokens} = await oauth2Client.getToken(req.query.code),
    user = jwt.decode(tokens.id_token);
  oauth2Client.setCredentials(tokens);
  
  User.findOne({ email: user.email })
    .then(u => {
      if (u) {
        // logging in
        const payload = {id: u._id, email: u.email};

        jwt.sign(
          payload,
          secretOrKey,
          {expiresIn: 3600},
          (err, token) => {
            res.json({
              token: token
            });
          }
        );
      } else {
        // registering
        const newUser = new User({
          email: user.email,
          password: tokens.access_token,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token
        });
        newUser.save()
          .then(user => {res.json(user)})
          .catch(err => console.log(err));
      }
    });
});

router.get("/url", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  });

  return res.json({ url });
})

module.exports = router;