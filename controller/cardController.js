const { Card } = require("../models/card");


const findAllCards = async (req, res) => {
    await Card.find().then(data => {
        const newData = [];
        for (const obj of data) {
            const newObj = {
                _id: obj._id,
                name:obj.name,
                assets: obj.assets,
                regions: obj.regionRefs,
                cost: obj.cost,
                type: obj.type,
                rarity: obj.rarityRef,
                keywords: obj.keywords,
            }
            newData.push(newObj);

        }
        res.json({ result: newData })
    });
};

module.exports = {
    findAllCards
};