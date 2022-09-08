const { blackNucleus, goldNucleus } = require('./gacha');
const generatePull = require('./generate-pull');
const uploadToImgur = require('../services/imgur');
const { insertUserPull } = require('../services/db-create');
const { findUserPulls } = require('../services/db-read');

const simulacra = require('../db/simulacra.json');
const rarities = require('../db/rarities.json');

const pull = async (isTen, type, { id, username, discriminator }) => {
  let pity = findUserPulls({ 'discordUser.id': id, from: type }).length;
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

  let _pulls = pulls.map($ => {
    $.bgColor = rarities[$.rarity];

    // Change all styles and image of SSR and SR pulls to Simulacra.
    if ($.rarity === "SSR" || $.rarity === "SR") {
      const [$simulacra] = simulacra.filter($$ => $.id === $$.weaponId);

      $.name = `**${$simulacra.name}**`; // Bold text
      $.img = $simulacra.simulacraImg;
      $.bgSize = 'initial';
    } else {
      $.bgSize = 'contain';
    }

    return $;
  });

  // Generate pull image
  const imgGen = await generatePull(_pulls);
  const base64Image = new Buffer.from(imgGen).toString('base64');
  const link = await uploadToImgur(base64Image);

  if (type === 'black-nucleus') return { pulls: _pulls, img: link }; // Do not record in DB if from black nucleus

  // Insert pulls to database
  insertUserPull(_pulls.map($ => ({
    discordUser: { id, username, discriminator },
    id: $.id,
    type: $.type,
    in: $.in,
    from: type
  })));

  pity = findUserPulls({ 'discordUser.id': id, from: type }).length; // Update pity count
  return { pulls: _pulls, img: link, pity };
};

module.exports = pull;