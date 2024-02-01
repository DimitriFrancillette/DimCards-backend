const { Card } = require("../models/card");


const findAllCards = async (req, res) => {
    await Card.find().then(data => {
        const newData = [];
        for (const obj of data) {
            const newObj = {
                _id: obj._id,
                assets: obj.assets
            }
            newData.push(newObj);

        }
        res.json({ result: newData })
    });
};

module.exports = {
    findAllCards
};