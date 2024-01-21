const { Card } = require("../models/card");


const findAllCards = async (req, res) => {
    await Card.find().then(data => {
        res.json({result:data})
    });
};

module.exports = {
    findAllCards
};