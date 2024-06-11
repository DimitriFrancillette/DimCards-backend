const { User } = require('../models/user');
const { checkBody } = require('../modules/checkBody');
const validator = require('validator');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  if (!checkBody(req.body, ['username', 'email', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  if (!validator.isEmail(req.body.email)) {
    res.json({ result: false, error: 'This email is not valid' });
    return;
  }

  //can be replace by is "isStrongPassword(str [, options])" later
  if (!validator.isLength(req.body.password, { min: 3, max: 100 })) {
    res.json({
      result: false,
      error: 'Password needs to be between 3 and 20 characters',
    });
    return;
  }

  try {
    const hash = bcrypt.hashSync(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      token: uid2(32),
      canBookmark: true,
    });

    await newUser.save().then((newDoc) => {
      res.json({ result: true, user: newDoc });
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.json({
        result: false,
        error: 'Username or email already exist',
      });
    }
    return res.json({ result: false, error: 'Error. Cannot create user' });
  }
};

const signInUser = async (req, res) => {
  if (!checkBody(req.body, ['email', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({ result: false, error: 'User not found' });
    }

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      return res.json({ result: true, user });
    }
    return res.json({ result: false, error: 'Wrong password' });
  } catch (error) {
    console.log(error);
    return res.json({ result: false, error: 'Error while sign in' });
  }
};

const deleteUser = async (req, res) => {
  if (!checkBody(req.body, ['email'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  try {
    const deletetedUser = await User.deleteOne({ email: req.body.email });
    if (deletetedUser.deletedCount > 0) {
      return res.json({ result: true, error: 'User deleted' });
    } else {
      return res.json({ result: false, error: 'User not fount' });
    }
  } catch (error) {
    return res.json({ result: false, error: 'impossible' });
  }
};

module.exports = {
  registerUser,
  signInUser,
  deleteUser,
};
