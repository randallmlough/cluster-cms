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
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.send",
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

const signJWT = u => {
  const payload = {
    id: u._id,
    email: u.email,
    gmailId: u.gmailId
  };

  return jwt.sign(payload, secretOrKey, {expiresIn: 3600});
}

router.get("/", async (req, res) => {
  const {tokens} = await oauth2Client.getToken(req.query.code),
    user = jwt.decode(tokens.id_token);
  oauth2Client.setCredentials(tokens);
  
  console.log(user);

  User.findOne({ email: user.email })
    .then(u => {
      if (u) {
        // logging in
        // check if access/refresh token has changed, save if so
        token = signJWT(u);
        res.json({token});
      } else {
        // registering
        const newUser = new User({
          email: user.email,
          gmailId: user.sub,
          password: tokens.access_token,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token
        });
        newUser.save()
          .then(user => {
            token = signJWT(user);
            res.json({user, token});
          })
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
});

module.exports = router;
