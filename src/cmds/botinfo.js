const path = require('path');
const { SlashCommandBuilder } = require('discord.js');
const client = require("../../index")


const botinfoEmbed = require("../embeds/botinfo.embed.js")

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'Give information about the bot';

module.exports = {
  name: NAME,
  description: DESCRIPTION,
  type: 'others',
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription(DESCRIPTION),
  async execute(interaction) {
    const embed = botinfoEmbed();

    await interaction.reply({ embeds: [embed] });
  },
};