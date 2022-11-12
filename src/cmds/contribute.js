const path = require('path');
const { SlashCommandBuilder } = require('discord.js');

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'Contribute to this project';

module.exports = {
  name: NAME,
  description: DESCRIPTION,
  type: 'others',
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription(DESCRIPTION),
  async execute(interaction) {
    const message = [
      'If you\'re planning to contribute via coding, that\'s nice! Be warned though \'cuz I\'m not particularly practicing any coding conventions.',
      'DM `Marviuz#8781` for more details about stuffs',
      'Github: https://github.com/Marviuz/tower-of-funtasy-discordbot/'
    ].join('\n');
    await interaction.reply({ content: message });
  },
};
