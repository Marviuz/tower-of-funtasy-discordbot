const path = require('path');
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'Oh! You wanna support me?!';

const buttons = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setLabel('Patreon')
      .setStyle('Link')
      .setURL('https://www.patreon.com/m/Marviuz'),
    new ButtonBuilder()
      .setLabel('Ko-fi')
      .setStyle('Link')
      .setURL('https://ko-fi.com/Marviuz/'),
  );

module.exports = {
  name: NAME,
  description: DESCRIPTION,
  type: 'others',
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription(DESCRIPTION),
  async execute(interaction) {
    const message = 'If you\'re considering supporting me... **Thank you very much! I really appreciate it!!**';
    await interaction.reply({ content: message, components: [buttons] });

  },
};