const { SlashCommandBuilder } = require('discord.js');
const path = require('path');

const matrices = require('../db/matrices.json');
const matricesCN = require('../db/cn/matrices.cn.json');
const matrixEmbed = require('../embeds/matrix.embed');

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
      option.setName("rarity")
        .setDescription('Quality of the matrix')
        .setRequired(true)
        .setChoices(
          { name: "SSR", value: "SSR" },
          { name: "SR", value: "SR" },
          { name: "R", value: "R" },
          { name: "N", value: "N" }
        )
    )
    .addStringOption(option =>
      option.setName(NAME)
        .setDescription('Name of the matrix')
        .setRequired(true)
        .setAutocomplete(true)
    ),

  async autocomplete(interaction) {
    const matrixs = [...matricesCN].filter(matrix => matrix.rarity === interaction.options.getString("rarity"));

    await interaction.respond(
      matrixs.map(matrix => ({ name: matrix.name, value: matrix.name.toLowerCase() })),
    );
  },


  async execute(interaction) {
    const matrix = await interaction.options.getString(NAME);

    const [match] = [...matrices, ...matricesCN].filter(({ name }) => name.toLowerCase() === matrix.toLowerCase());

    if (!match) return await interaction.reply('No match!'); // TODO: Better message

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
      
      await i.editReply({ embeds: [embed['matrix'+CN]], components: [action()] });
    })

    collector.on('end', async collected => {
      console.log(`Collected ${collected.size} items`);
      await interaction.editReply({ components: [] });
    });
  },
};
