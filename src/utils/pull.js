const fs = require('fs');
const path = require('path');
const nodeHtmlToImage = require('node-html-to-image');
const { ImgurClient } = require('imgur');

const simulacra = require('../db/simulacra.json');
const rarities = require('../db/rarities.json');

const { blackNucleus } = require('./gacha');

const template = fs.readFileSync(path.resolve(__dirname, '../', 'templates', 'gacha.hbs'), 'utf8');

const imgurClient = new ImgurClient({ clientId: process.env.IMGUR_CLIENT_ID });

const pull = async (isTen, type) => {
  let pulls;

  switch (type) { // TODO: Logic
    case 'black-nucleus':
      pulls = blackNucleus(isTen);
      break;
    case 'gold-nucleus':
      break;
    case 'red-nucleus':
      break;
    case 'matrix':
      break;
    case 'limited-matrix':
      break;
  }

  let pullsN = pulls.map($ => {
    $.bgColor = rarities[$.rarity];

    if ($.rarity === "SSR" || $.rarity === "SR") {
      const [$simulacra] = simulacra.filter($$ => $.id === $$.weaponId);

      $.img = $simulacra.simulacraImg;
      $.bgSize = 'inital';
    } else {
      $.bgSize = 'contain';
    }

    return $;
  });

  const imgGen = await nodeHtmlToImage({
    html: template,
    content: { data: pullsN }
  });

  const base64Image = new Buffer.from(imgGen).toString('base64');
  const response = await imgurClient.upload({ image: base64Image, type: 'base64' });

  return response.data.link;
};

module.exports = pull;