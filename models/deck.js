const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  cards: [{ cardCode: String, number: Number }],
  public: Boolean,
  created_at: { type: Date, default: Date.now },
});

const Deck = mongoose.model('decks', deckSchema);

module.exports = { Deck };
