var express = require('express');
var router = express.Router();
const {findAllCards} = require("../controller/cardController");

/* GET users listing. */
router.get('/', findAllCards);

module.exports = router;
