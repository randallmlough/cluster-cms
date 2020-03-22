const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  port: process.env.PORT,
  mongoURI: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUrl: process.env.GOOGLE_REDIRECT_URL,
    credentials: {
      type: process.env.GOOGLE_CRED_TYPE,
      project_id: process.env.GOOGLE_CRED_PROJECT_ID,
      private_key_id: process.env.GOOGLE_CRED_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_CRED_PRIVATE_KEY,
      client_email: process.env.GOOGLE_CRED_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CRED_CLIENT_ID,
      auth_uri: process.env.GOOGLE_CRED_AUTH_URI,
      token_uri: process.env.GOOGLE_CRED_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.GOOGLE_CRED_AUTH_CERT_URL,
      client_x509_cert_url: process.env.GOOGLE_CRED_TYPE_CLIENT_CERT_URL,
    },
  },
};
