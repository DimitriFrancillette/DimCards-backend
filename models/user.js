const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(v) {
      if (!validator.isEmail(v)) throw new Error('This email is not valid');
    },
  },
  password: {
    type: String,
    required: true,
    validate(v) {
      if (!validator.isLength(v, { min: 3, max: 20 })) {
        throw new Error('Password needs to be between 3 and 20 characters');
      }
    },
  },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model('users', userSchema);

module.exports = { User };
