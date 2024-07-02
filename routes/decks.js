var express = require('express');
var router = express.Router();
const {
  saveDeck,
  deleteDeck,
  updateDeck,
  getUserDecks,
  getPublicDecks,
} = require('../controller/deckController');

router.post('/save', saveDeck);
router.delete('/delete', deleteDeck);
router.patch('/update', updateDeck);
router.get('/user/:userId', getUserDecks);
router.get('/public', getPublicDecks);

module.exports = router;
