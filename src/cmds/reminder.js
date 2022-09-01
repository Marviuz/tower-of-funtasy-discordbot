const { SlashCommandBuilder } = require('discord.js');
const { ReminderEmbed, attachment } = require('../embeds/reminder.embed');
const path = require('path');

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'ToF View dailies/weeklies!';

module.exports = {
  name: NAME,
  description: DESCRIPTION,
  type: 'tof',
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription(DESCRIPTION),
  async execute(interaction) {
    await interaction.deferReply();
    await interaction.editReply({ embeds: [ReminderEmbed], files: [attachment] });
  },
};