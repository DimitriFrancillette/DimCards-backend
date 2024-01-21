const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    associatedCards: [String],
    associatedCardRefs: [String],
    assets: [{
        gameAbsolutePath: String,
        fullAbsolutePath: String,
    }],
    regions: [String],
    regionRefs: [String],
    attack: Number,
    cost: Number,
    health: Number,
    description: String,
    descriptionRaw: String,
    levelupDescription: String,
    levelupDescriptionRaw: String,
    flavorText: String,
    artistName: String,
    name: String,
    cardCode: String,
    keywords: [String],
    keywordRefs: [String],
    spellSpeed: String,
    spellSpeedRef: String,
    rarity: String,
    rarityRef: String,
    subtypes: [String],
    supertype: String,
    type: String,
    collectible: Boolean,
    set: String,
    formats: [String],
    formatRefs: [String],
});

const Card = mongoose.model("cards", cardSchema);

module.exports = { Card };
