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
      res.json({ result: true, deck: newDoc });
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ result: false, error: 'Duplicate deck id.' });
    }
    return res.json({ result: false, error: 'Cannot save deck.' });
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
      res.json({ result: true, deck: updatedDeck, message: 'Deck updated' });
    });
  } catch (error) {
    return res.json({
      result: false,
      message: 'Impossibme to update',
      error: error,
    });
  }
};

const deleteDeck = async (req, res) => {
  try {
    const deletetedDeck = await Deck.deleteOne({ id: req.body.id });
    if (deletetedDeck.deletedCount > 0) {
      return res.json({ result: true, message: 'Deck deleted' });
    } else {
      return res.json({ result: false, error: 'Deck not fount' });
    }
  } catch (error) {
    return res.json({ result: false, error: 'Error. Impossible to delete' });
  }
};

module.exports = {
  saveDeck,
  deleteDeck,
  updateDeck,
};
