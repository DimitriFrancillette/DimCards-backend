var express = require('express');
var router = express.Router();
const { registerUser, signInUser } = require('../controller/userController');

/* route users listing. */
router.post('/register', registerUser);
router.post('/signin', signInUser);

module.exports = router;
