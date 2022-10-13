const path = require('path');
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'Invite this bot to youre server';

const button = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setLabel('Invite!')
      .setStyle('Link')
      .setURL('https://top.gg/bot/1013445171536482326')
  );

module.exports = {
  name: NAME,
  description: DESCRIPTION,
  type: 'others',
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription(DESCRIPTION),
  async execute(interaction) {
    const message = 'Invite this bot to youre server';
    await interaction.reply({ content: message, components: [button], ephemeral: true });

  },
};
