const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const rarities = require('../db/rarities.json');
const { emojis } = require('../utils/app-constants');

const matrixEmbed = ({ matrixImg, matrixId, name, rarity, two, three, four, chinaOnly }) => {
  const attachment = new AttachmentBuilder(matrixImg, { name: `${matrixId}.webp` });
  let piece = rarity === 'SSR' ?
    ([{ name: '2-piece set', value: two }, { name: '4-piece set', value: four }]) :
    ({ name: '3-piece set', value: three });

  return {
    embed: new EmbedBuilder()
      .setColor(rarities[rarity])
      .setTitle(chinaOnly ? `${emojis.cn} ${name}` : name)
      .setThumbnail(`attachment://${matrixId}.webp`)
      .addFields(piece),
    attachment
  };
};

module.exports = matrixEmbed;
