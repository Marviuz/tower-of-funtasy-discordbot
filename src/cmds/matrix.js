const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const path = require('path');

const matrices = require('../db/local/matrices.json');
const matricesCN = require('../db/local/cn/matrices.cn.json');
const matrixEmbed = require('../embeds/matrix.embed');
const { ZERO_WIDTH_SPACE, emojis } = require('../utils/app-constants');

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'View matrix details';

module.exports = {
  name: NAME,
  description: DESCRIPTION,
  type: 'tof',
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription(DESCRIPTION)
    .addStringOption(option =>
      option.setName(NAME)
        .setDescription('Name of the matrix')
    ),

  async execute(interaction) {
    const matrix = await interaction.options.getString(NAME);

    if (!matrix) return await interaction.reply({ embeds: [
      { 
        title: 'Matrices', 
        fields: [
          { name: emojis["rarity_SSR"], value: [...matricesCN].filter(_ => _.rarity == "SSR").map(_ => (_.chinaOnly ? `${_.name} ${emojis.cn}` : _.name)).sort().join(', ') },
          { name: emojis["rarity_SR"], value: [...matricesCN].filter(_ => _.rarity == "SR").map(_ => (_.chinaOnly ? `${_.name} ${emojis.cn}` : _.name)).sort().join(', ') },
          { name: emojis["rarity_R"], value: [...matricesCN].filter(_ => _.rarity == "R").map(_ => (_.chinaOnly ? `${_.name} ${emojis.cn}` : _.name)).sort().join(', ') },
          { name: emojis["rarity_N"], value: [...matricesCN].filter(_ => _.rarity == "N").map(_ => (_.chinaOnly ? `${_.name} ${emojis.cn}` : _.name)).sort().join(', ') },
        ], 
        image: { url: "https://i8.ae/DewNO" }
      }] 
    });

    const [match] = [...matrices, ...matricesCN].filter(({ name }) => name.toLowerCase() === matrix.toLowerCase());
    
    const error = new EmbedBuilder()
    .setColor("Red")
    .setTitle("No match!")
    .setDescription("Try `/matrix` to see the list of matrix avaible")
    if (!match) return await interaction.reply({ embeds: [error] }); // TODO: Better message

    const { embed, action, button } = matrixEmbed(match);

    if (button.id === "chinaOnly" || match.rarity != 'SSR') {
      await interaction.reply({ embeds: [embed["matrix"]] });
    } else {
      await interaction.reply({ embeds: [embed["matrix"]], components: [action()] });
    }
  
    let CN = '';

    const filter = i => i.message.interaction.id === interaction.id && i.customId == button.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter });
    collector.on('collect', async i => {
      await i.deferUpdate();
      button.emoji === '🌍' ? button.emoji = '<:CN:1035098249687744542>' : button.emoji = '🌍'
      button.id === 'global' ? button.id = 'cn' : button.id = 'global'
      CN === '' ? CN = 'CN' : CN = ''
      
      await i.reply({ embeds: [embed['matrix'+CN]], components: [action()] });
    })

    collector.on('end', async collected => {
      console.log(`Collected ${collected.size} items`);
      await interaction.reply({ components: [] });
    });
  },
};
