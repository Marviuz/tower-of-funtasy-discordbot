const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const rarities = require('../db/rarities.json');

const matrixEmbed = ({ matrixImg, matrixId, matrixName, rarity, effect }) => {
  const attachment = new AttachmentBuilder(matrixImg, { name: `${matrixId}.webp` });
  let piece = rarity === 'SSR' ?
    ([{ name: '2-piece set', value: effect.two }, { name: '4-piece set', value: effect.four }]) :
    ({ name: '3-piece set', value: effect.three });

  return {
    embed: new EmbedBuilder()
      .setColor(rarities[rarity])
      .setTitle(matrixName)
      .setThumbnail(`attachment://${matrixId}.webp`)
      .addFields(piece),
    attachment
  };
};

module.exports = matrixEmbed;
