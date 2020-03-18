const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  ownerId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
});

module.exports = Contact = mongoose.model("Contact", ContactSchema);