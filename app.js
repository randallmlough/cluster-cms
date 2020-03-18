const express = require("express");
const app = express();
const uri = require('./backend/config/keys').mongoURI;
const User = require('./backend/models/User');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require("./backend/routes/api/users");
const oauth = require("./backend/routes/api/oauth");
const contacts = require("./backend/routes/api/contacts");
const email = require("./backend/routes/api/email");

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World!!"));

app.use(passport.initialize());
require("./backend/config/passport")(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/oauth", oauth);
app.use("/api/contacts", contacts);
app.use("/api/email", email);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
