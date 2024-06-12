var express = require('express');
var router = express.Router();
const { saveDeck, deleteDeck } = require('../controller/deckController');

/* route users listing. */
router.post('/save', saveDeck);
router.delete('/delete', deleteDeck);

module.exports = router;
