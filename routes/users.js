var express = require('express');
var router = express.Router();
const {
  registerUser,
  signInUser,
  deleteUser,
} = require('../controller/userController');

/* route users listing. */
router.post('/register', registerUser);
router.post('/signin', signInUser);
router.delete('/delete', deleteUser);

module.exports = router;
