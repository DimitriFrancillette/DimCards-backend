const { Card } = require('../models/card');

const findAllCards = async (req, res) => {
  await Card.find().then((data) => {
    // console.log('data', data);
    let allCards = data;
    const newData = [];
    //FOR ALL DATA
    // for (const obj of data) {
    //   const newObj = {
    //     _id: obj._id,
    //     name: obj.name,
    //     assets: obj.assets,
    //     regions: obj.regionRefs,
    //     cost: obj.cost,
    //     type: obj.type,
    //     rarity: obj.rarityRef,
    //     keywords: obj.keywords,
    //   };
    //   newData.push(newObj);
    // }

    //ADDING Ionia
    while (newData.length < 5) {
      const foundCard = allCards.find((obj) =>
        obj.regionRefs.includes('Ionia')
      );
      const newObj = {
        _id: foundCard._id,
        name: foundCard.name,
        assets: foundCard.assets,
        regions: foundCard.regionRefs,
        cost: foundCard.cost,
        type: foundCard.type,
        rarity: foundCard.rarityRef,
        keywords: foundCard.keywords,
      };
      newData.push(newObj);
      allCards = allCards.filter((obj) => obj.cardCode != foundCard.cardCode);
    }

    //ADDING Demacia
    while (newData.length >= 5 && newData.length < 10) {
      const foundCard = allCards.find((obj) =>
        obj.regionRefs.includes('Demacia')
      );
      const newObj = {
        _id: foundCard._id,
        name: foundCard.name,
        assets: foundCard.assets,
        regions: foundCard.regionRefs,
        cost: foundCard.cost,
        type: foundCard.type,
        rarity: foundCard.rarityRef,
        keywords: foundCard.keywords,
      };
      newData.push(newObj);
      allCards = allCards.filter((obj) => obj.cardCode != foundCard.cardCode);
    }

    //ADDING P&Z
    while (newData.length >= 10 && newData.length < 15) {
      const foundCard = allCards.find((obj) =>
        obj.regionRefs.includes('PiltoverZaun')
      );
      const newObj = {
        _id: foundCard._id,
        name: foundCard.name,
        assets: foundCard.assets,
        regions: foundCard.regionRefs,
        cost: foundCard.cost,
        type: foundCard.type,
        rarity: foundCard.rarityRef,
        keywords: foundCard.keywords,
      };
      newData.push(newObj);
      allCards = allCards.filter((obj) => obj.cardCode != foundCard.cardCode);
    }

    //ADDING Freljord
    while (newData.length >= 15 && newData.length < 20) {
      const foundCard = allCards.find((obj) =>
        obj.regionRefs.includes('Freljord')
      );
      const newObj = {
        _id: foundCard._id,
        name: foundCard.name,
        assets: foundCard.assets,
        regions: foundCard.regionRefs,
        cost: foundCard.cost,
        type: foundCard.type,
        rarity: foundCard.rarityRef,
        keywords: foundCard.keywords,
      };
      newData.push(newObj);
      allCards = allCards.filter((obj) => obj.cardCode != foundCard.cardCode);
    }

    //ADDING Noxus
    while (newData.length >= 20 && newData.length < 25) {
      const foundCard = allCards.find((obj) =>
        obj.regionRefs.includes('Noxus')
      );
      const newObj = {
        _id: foundCard._id,
        name: foundCard.name,
        assets: foundCard.assets,
        regions: foundCard.regionRefs,
        cost: foundCard.cost,
        type: foundCard.type,
        rarity: foundCard.rarityRef,
        keywords: foundCard.keywords,
      };
      newData.push(newObj);
      allCards = allCards.filter((obj) => obj.cardCode != foundCard.cardCode);
    }

    // ADDING Shadow Isles
    while (newData.length >= 25 && newData.length < 30) {
      const foundCard = allCards.find((obj) =>
        obj.regionRefs.includes('ShadowIsles')
      );
      const newObj = {
        _id: foundCard._id,
        name: foundCard.name,
        assets: foundCard.assets,
        regions: foundCard.regionRefs,
        cost: foundCard.cost,
        type: foundCard.type,
        rarity: foundCard.rarityRef,
        keywords: foundCard.keywords,
      };
      newData.push(newObj);
      allCards = allCards.filter((obj) => obj.cardCode != foundCard.cardCode);
    }

    // ADDING Runeterra
    while (newData.length >= 30 && newData.length < 35) {
      const foundCard = allCards.find((obj) =>
        obj.regionRefs.includes('Runeterra')
      );
      const newObj = {
        _id: foundCard._id,
        name: foundCard.name,
        assets: foundCard.assets,
        regions: foundCard.regionRefs,
        cost: foundCard.cost,
        type: foundCard.type,
        rarity: foundCard.rarityRef,
        keywords: foundCard.keywords,
      };
      newData.push(newObj);
      allCards = allCards.filter((obj) => obj.cardCode != foundCard.cardCode);
    }

    // ADDING Bandle City
    while (newData.length >= 35 && newData.length < 40) {
      const foundCard = allCards.find((obj) =>
        obj.regionRefs.includes('BandleCity')
      );
      const newObj = {
        _id: foundCard._id,
        name: foundCard.name,
        assets: foundCard.assets,
        regions: foundCard.regionRefs,
        cost: foundCard.cost,
        type: foundCard.type,
        rarity: foundCard.rarityRef,
        keywords: foundCard.keywords,
      };
      newData.push(newObj);
      allCards = allCards.filter((obj) => obj.cardCode != foundCard.cardCode);
    }

    // ADDING Targon
    while (newData.length >= 40 && newData.length < 45) {
      const foundCard = allCards.find((obj) =>
        obj.regionRefs.includes('Targon')
      );
      const newObj = {
        _id: foundCard._id,
        name: foundCard.name,
        assets: foundCard.assets,
        regions: foundCard.regionRefs,
        cost: foundCard.cost,
        type: foundCard.type,
        rarity: foundCard.rarityRef,
        keywords: foundCard.keywords,
      };
      newData.push(newObj);
      allCards = allCards.filter((obj) => obj.cardCode != foundCard.cardCode);
    }

    // ADDING Bilgewater
    while (newData.length >= 45 && newData.length < 50) {
      const foundCard = allCards.find((obj) =>
        obj.regionRefs.includes('Bilgewater')
      );
      const newObj = {
        _id: foundCard._id,
        name: foundCard.name,
        assets: foundCard.assets,
        regions: foundCard.regionRefs,
        cost: foundCard.cost,
        type: foundCard.type,
        rarity: foundCard.rarityRef,
        keywords: foundCard.keywords,
      };
      newData.push(newObj);
      allCards = allCards.filter((obj) => obj.cardCode != foundCard.cardCode);
    }

    // ADDING Shurima
    while (newData.length >= 50 && newData.length < 55) {
      const foundCard = allCards.find((obj) =>
        obj.regionRefs.includes('Shurima')
      );
      const newObj = {
        _id: foundCard._id,
        name: foundCard.name,
        assets: foundCard.assets,
        regions: foundCard.regionRefs,
        cost: foundCard.cost,
        type: foundCard.type,
        rarity: foundCard.rarityRef,
        keywords: foundCard.keywords,
      };
      newData.push(newObj);
      allCards = allCards.filter((obj) => obj.cardCode != foundCard.cardCode);
    }

    res.json({ result: newData });
  });
};

module.exports = {
  findAllCards,
};
