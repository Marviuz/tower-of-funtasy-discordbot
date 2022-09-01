const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const rarities = require('../db/rarities.json');

const matrixEmbed = ({ name, rarity, two, three, four }) => {
  const fileName = `${name.toLowerCase().replace(' ', '')}-matrix.webp`;
  const attachment = new AttachmentBuilder(`src/assets/matrices/${fileName}`); // Might have problems with relative pathing
  let piece = rarity === 'SSR' ?
    ([{ name: '2-piece set', value: two }, { name: '4-piece set', value: four }]) :
    ({ name: '3-piece set', value: three });

  return {
    embed: new EmbedBuilder()
      .setColor(rarities[rarity])
      .setTitle(name)
      .setThumbnail(`attachment://${fileName}`)
      .addFields(piece),
    attachment
  };
};

module.exports = matrixEmbed;