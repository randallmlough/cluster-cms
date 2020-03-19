const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gmailId: {
    type: String,
    required: false
  },
  accessToken: {
    type: String,
    required: false
  },
  refreshToken: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model('User', UserSchema);
