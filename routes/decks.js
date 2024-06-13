var express = require('express');
var router = express.Router();
const {
  saveDeck,
  deleteDeck,
  updateDeck,
} = require('../controller/deckController');

/* route users listing. */
router.post('/save', saveDeck);
router.delete('/delete', deleteDeck);
router.patch('/update', updateDeck);

module.exports = router;
