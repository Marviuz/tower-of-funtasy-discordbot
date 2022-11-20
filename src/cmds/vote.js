const path = require('path');
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'Vote to support the bot and creators';


const embed = new EmbedBuilder()
  .setTitle("Vote for the bot by clicking the button")
  .setDescription("Thank you for supporting!");

const buttons = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setLabel('Vote')
      .setStyle('Link')
      .setEmoji('📩')
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
    await interaction.reply({ embeds: [embed], components: [buttons] });
  },
};
