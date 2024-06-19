const { Deck } = require('../models/deck');
const uid2 = require('uid2');
const { checkBody } = require('../modules/checkBody');

//*Question: Do I want duplicate deck name for the same user ?
const saveDeck = async (req, res) => {
  //todo : When used with the front delete the next line
  req.body.cards = [{ cardCode: '06RU008', number: 2 }];

  req.body.id = uid2(64);

  try {
    const newDeck = new Deck(req.body);

    await newDeck.save().then((newDoc) => {
      return res.status(201).json({ deck: newDoc });
    });
  } catch (error) {
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
  req.body.cards = [{ cardCode: '06RU008', number: 3 }];

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
      console.log(deletedDeck);
      if (deletedDeck.deletedCount > 0) {
        console.log('ON PASSE LA');
        return res.status(200).json({ message: 'Deck deleted' });
      } else {
        console.log('ON PASSE 404');
        return res.status(404).json({ error: 'Deck not found' });
      }
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
};
