const path = require('path');
const { SlashCommandBuilder } = require('discord.js');

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'Nothing much in here';

module.exports = {
  name: NAME,
  description: DESCRIPTION,
  type: 'others',
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription(DESCRIPTION),
  async execute(interaction) {
    const message = 'idk... It\'s just fun doing this kind of stuff... well, if you ever wanted to support me, type in /support';
    await interaction.reply({ content: message, ephemeral: true });
  },
};