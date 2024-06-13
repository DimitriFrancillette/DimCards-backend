var express = require('express');
var router = express.Router();
const {
  registerUser,
  signInUser,
  updateUser,
  deleteUser,
} = require('../controller/userController');

/* route users listing. */
router.post('/register', registerUser);
router.post('/signin', signInUser);
router.patch('/update', updateUser);
router.delete('/delete', deleteUser);

module.exports = router;
