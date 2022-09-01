const fs = require('fs');
const path = require('path');
const { SlashCommandBuilder } = require('discord.js');

const helpEmbed = require('../embeds/help.embed');

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'See all commands';

module.exports = {
  name: NAME,
  description: DESCRIPTION,
  type: 'bot',
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription(DESCRIPTION),
  async execute(interaction) {
    const commandFiles = fs.readdirSync(__dirname).map(file => require(`./${path.parse(file).name}`)); // Automatically generate help commands

    await interaction.reply({ embeds: [helpEmbed(commandFiles)] });
  },
};