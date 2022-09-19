const fs = require('fs');
const path = require('path');
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');

const htmlToImg = require('../utils/html-to-img');
const uploadToImgur = require('../services/imgur');

const equipment = require('../db/equipment.json');
const matrices = require('../db/matrices.json');
const rarities = require('../db/rarities.json');

const template = fs.readFileSync(path.resolve(__dirname, '../', 'templates', 'jo.hbs'), 'utf8');

module.exports = async (data) => {
  const rewards = data.rewards.map(_ => {
    if (_.type === 'equipment') {
      const [e] = equipment.filter(__ => _.id === __.id);
      e.bgColor = rarities[e.rarity];
      return e;
    }

    if (_.type === 'matrix') {
      const [m] = matrices.filter(__ => _.id === __.matrixId);
      m.img = m.matrixImg;
      m.bgColor = rarities[m.rarity];
      m.type = _.type;
      return m;
    }
  });

  rewards.sort((a, b) => {
    const prio = { SSR: 0, SR: 1, R: 2 };
    return prio[a.rarity] - prio[b.rarity];
  });

  const generatedImg = await htmlToImg(template, rewards);
  const base64Image = new Buffer.from(generatedImg).toString('base64');
  const imgurLink = await uploadToImgur(base64Image);
  const attachment = new AttachmentBuilder(imgurLink, { name: `${data.name.replace(/\s+/g, '-').toLowerCase()}.png` });

  const embed = new EmbedBuilder()
    .setTitle(data.name)
    .addFields(
      { name: 'Availability', value: data.availability.join(', ') },
      { name: 'Enemy Resistances', value: data.resistance.length ? data.resistance.join(', ') : 'none' },
    )
    .setImage(`attachment://${data.name.replace(/\s+/g, '-').toLowerCase()}.png`);

  return ({
    embed,
    attachment
  });
};
