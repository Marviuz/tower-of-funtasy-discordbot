const { blackNucleus, goldNucleus } = require('./gacha');
const generatePull = require('./generate-pull');
const uploadToImgur = require('../services/imgur');

const simulacra = require('../db/local/simulacra.json');
const rarities = require('../db/local/rarities.json');

const pull = async (isTen, type, { id, username, discriminator }) => {
  let pulls;

  switch (type) { // TODO: Logic
    case 'black-nucleus':
      pulls = blackNucleus(isTen);
      break;
    case 'gold-nucleus':
      pulls = goldNucleus(isTen, pity);
      break;
    case 'red-nucleus':
      break;
    case 'matrix':
      break;
    case 'limited-matrix':
      break;
  }

  let _pulls = pulls.map(($, index) => {
    $.bgColor = rarities[$.rarity];

    // Change all styles and image of SSR and SR pulls to Simulacra.
    if ($.rarity === "SSR" || $.rarity === "SR") {
      const [$simulacra] = simulacra.filter($$ => $.id === $$.weaponId);

      $.name = $simulacra.weapon;
      $.img = $simulacra.gacha10pull;
    }

    switch ($.rarity) {
      case 'SSR':
        if (!(index % 2)) $.class = 'card--srr1-new';
        else $.class = 'card--srr2-new';
        break;
      case 'SR':
        if (!(index % 2)) $.class = 'card--sr1-new';
        else $.class = 'card--sr2-new';
        break;
      case 'R':
        $.class = 'card--rare';
        break;
      default:
        $.class = 'card--common';
    }

    return $;
  });

  console.log(_pulls);

  // Generate pull image
  const imgGen = await generatePull(_pulls);
  const base64Image = new Buffer.from(imgGen).toString('base64');
  const link = await uploadToImgur(base64Image);

  if (type === 'black-nucleus') return { pulls: _pulls, img: link }; // Do not record in DB if from black nucleus
  return { pulls: _pulls, img: link, pity };
};

module.exports = pull;
