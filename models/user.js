const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: String,
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model('users', userSchema);

module.exports = { User };