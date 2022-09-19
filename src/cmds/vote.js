const path = require('path');
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'idk... Every bot seems to have this so I\'ll add one as well';

const buttons = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setLabel('Vote')
      .setStyle('Link')
      .setURL('https://top.gg/bot/1013445171536482326/vote'),
  );

module.exports = {
  name: NAME,
  description: DESCRIPTION,
  type: 'others',
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription(DESCRIPTION),
  async execute(interaction) {
    const message = DESCRIPTION;
    await interaction.reply({ content: message, components: [buttons], ephemeral: true });
  },
};