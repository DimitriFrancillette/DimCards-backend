const { User } = require('../models/user');
const { checkBody } = require('../modules/checkBody');

const registerUser = async (req, res) => {
  if (!checkBody(req.body, ['username', 'email', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  const newUser = new User(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.json({ result: false, error: 'user already exist !' });
    }
    newUser.save().then((newDoc) => {
      res.json({ result: true, user: newDoc });
    });
  } catch {
    return res.json({ result: false, error: 'Cannot create user' });
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

    if (user && user.password === req.body.password) {
      return res.json({ result: true, user });
    }
    return res.json({ result: false, error: 'Wrong password' });
  } catch {
    return res.json({ result: false, error: 'Error while sign in' });
  }
};

module.exports = {
  registerUser,
  signInUser,
};
