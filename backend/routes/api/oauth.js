const express = require("express");
const router = express.Router();
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

router.get("/test", (req, res) => res.json({ msg: "This is the oauth route" }));

module.exports = router;