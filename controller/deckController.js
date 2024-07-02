const { Deck } = require('../models/deck');
const uid2 = require('uid2');
const { checkBody } = require('../modules/checkBody');

const saveDeck = async (req, res) => {
  try {
    const newCards = [];
    for (const card of req.body.cards) {
      const cardToAdd = {
        cardCode: card.card.cardCode,
        number: card.number,
        regionRefs: card.card.regions,
      };
      newCards.push(cardToAdd);
    }

    const newDeck = new Deck({
      id: uid2(64),
      name: req.body.name,
      userId: req.body.userId,
      regions: req.body.regions,
      cards: newCards,
      public: req.body.public,
    });

    await newDeck.save().then((newDoc) => {
      return res.status(201).json({ deck: newDoc });
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Duplicate deck id.' });
    }
    return res.status(500).json({
      message: 'Cannot save deck, internal server error',
      error,
    });
  }
};

const updateDeck = async (req, res) => {
  //todo : When used with the front delete the next line
  req.body.cards = [{ cardCode: '06MT006', number: 3, regionRefs: 'Targon' }];

  try {
    const toUpdate = {
      name: req.body.name,
      cards: req.body.cards,
      public: req.body.public,
    };
    await Deck.findOneAndUpdate({ id: req.body.id }, toUpdate, {
      new: true,
    }).then((updatedDeck) => {
      if (!updatedDeck) {
        return res.status(404).json({ error: 'Deck not found' });
      }
      return res.status(200).json({
        deck: updatedDeck,
        message: 'Deck updated',
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Impossible to update',
      error,
    });
  }
};

const deleteDeck = async (req, res) => {
  try {
    await Deck.deleteOne({ id: req.body.id }).then((deletedDeck) => {
      if (deletedDeck.deletedCount > 0) {
        return res.status(200).json({ message: 'Deck deleted' });
      } else {
        return res.status(404).json({ error: 'Deck not found' });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Cannot delete, internal server error',
      error,
    });
  }
};

const getUserDecks = async (req, res) => {
  try {
    const { userId } = req.params;

    await Deck.find({ userId: userId }).then((data) => {
      return res.status(200).json({ decks: data });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Cannot delete, internal server error',
      error,
    });
  }
};

const getPublicDecks = async (req, res) => {
  console.log('HERE');
  try {
    await Deck.find({ public: true }).then((data) => {
      console.log(data);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Cannot delete, internal server error',
      error,
    });
  }
};

module.exports = {
  saveDeck,
  deleteDeck,
  updateDeck,
  getUserDecks,
  getPublicDecks,
};
