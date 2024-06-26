const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  regions: [String],
  cards: [{ cardCode: String, number: Number, regionRefs: String }],
  public: Boolean,
  created_at: { type: Date, default: Date.now },
});

const Deck = mongoose.model('decks', deckSchema);

module.exports = { Deck };
