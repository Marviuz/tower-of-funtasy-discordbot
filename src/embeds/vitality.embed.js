const { EmbedBuilder } = require('discord.js');
const { emojis } = require('../utils/app-constants')

function vitalityEmbed(desired) {
  const embed = new EmbedBuilder()
      .setTitle('Your Vitality Schedule was ended.')
      .setColor('Blue')
      .setTimestamp()
      .addFields(
          { name: "Desired:", value: `${emojis["vitality"]} ${desired}` }
      )
    
  return embed
}

module.exports = vitalityEmbed;