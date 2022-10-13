const { SlashCommandBuilder } = require('discord.js');
const path = require('path');
const { getSimulacrum } = require('../controllers/simulacra.controller');

const simulacraEmbed = require('../embeds/simulacra.embed');

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'View simulacra details';

module.exports = {
  name: NAME,
  description: DESCRIPTION,
  type: 'tof',
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription(DESCRIPTION)
    .addStringOption(option => option.setName(NAME).setDescription('Name of the simulacra').setRequired(true)),
  async execute(interaction) {
    await interaction.deferReply();

    const _simulacrumInput = await interaction.options.getString(NAME);
    const _simulacrum = await getSimulacrum(_simulacrumInput);

    if (!_simulacrum) return await interaction.editReply('No match!');

    const { embed, actions, buttons } = simulacraEmbed(_simulacrum);
    await interaction.editReply({ embeds: [embed.basicDetails], components: [actions('basicDetails')] });

    buttons.forEach(button => {
      const filter = i => i.customId === button.id && i.message.interaction.id === interaction.id;
      const collector = interaction.channel.createMessageComponentCollector({ filter });

      collector.on('collect', async i => {
        await i.deferUpdate();
        await i.editReply({ embeds: [embed[button.id]], components: [actions(button.id)] });
      });

      collector.on('end', async collected => {
        console.log(`Collected ${collected.size} items`);
        await interaction.editReply({ components: [] });
      });
    });
  },
};
