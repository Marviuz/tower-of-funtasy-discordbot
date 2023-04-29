const path = require('path');
const { SlashCommandBuilder } = require('discord.js');

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'Allows giving meta teams according to different characteristics';

module.exports = {
  name: NAME,
  description: DESCRIPTION,
  type: 'tof',
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription(DESCRIPTION)
    .addStringOption(option => option
      .setName('role')
      .setDescription('Role of the team')
    )
    .addStringOption(option => option
      .setName('element')
      .setDescription('Element of the team')
    ),

  async execute(interaction) {
    const role = interaction.options.getString('role');
    const element = interaction.options.getString('element');
    await interaction.reply(`${element} ${role}`);
  },
};