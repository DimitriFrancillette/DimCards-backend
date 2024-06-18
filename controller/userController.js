const { User } = require('../models/user');
const { checkBody } = require('../modules/checkBody');
const validator = require('validator');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  if (!checkBody(req.body, ['username', 'email', 'password'])) {
    res.status(400).json({ error: 'Missing or empty fields' });
    return;
  }

  if (!validator.isEmail(req.body.email)) {
    res.status(400).json({ error: 'This email is not valid' });
    return;
  }

  //can be replace by is "isStrongPassword(str [, options])" later
  if (!validator.isLength(req.body.password, { min: 3, max: 100 })) {
    res.status(400).json({
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

    await newUser.save().then((userInfo) => {
      return res.status(201).json({
        username: userInfo.username,
        email: userInfo.email,
        token: userInfo.token,
      });
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.status(400).json({ error: 'Username or email already exist' });
    }
    return res.status(500).json({
      error: 'Cannot create user, internal server error',
    });
  }
};

const signInUser = async (req, res) => {
  if (!checkBody(req.body, ['email', 'password'])) {
    res.status(400).json({ error: 'Missing or empty fields' });
    return;
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(200).json({
        username: user.username,
        email: user.email,
        token: user.token,
      });
    }
    return res.status(400).json({ error: 'Wrong password' });
  } catch (error) {
    return res.status(500).json({
      error: 'Cannot sign in, internal server error',
    });
  }
};

const updateUser = async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);

  try {
    const toUpdate = {
      username: req.body.username,
      email: req.body.email,
      password: hash,
    };
    await User.findOneAndUpdate({ _id: req.body._id }, toUpdate, {
      new: true,
    }).then((updatedUser) => {
      return res.status(200).json({
        user: {
          username: updatedUser.username,
          email: updatedUser.email,
          token: updatedUser.token,
        },
        message: 'Informations updated',
      });
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Cannot update, internal server error',
    });
  }
};

const deleteUser = async (req, res) => {
  if (!checkBody(req.body, ['email'])) {
    res.status(400).json({ error: 'Missing or empty fields' });
    return;
  }
  try {
    const deletetedUser = await User.deleteOne({ email: req.body.email });
    if (deletetedUser.deletedCount > 0) {
      return res.status(204).json({ error: 'User deleted' });
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({
      error: 'Cannot delete, internal server error',
    });
  }
};

module.exports = {
  registerUser,
  signInUser,
  updateUser,
  deleteUser,
};
