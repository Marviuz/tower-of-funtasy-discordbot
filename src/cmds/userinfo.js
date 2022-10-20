const path = require('path');
const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const axios = require('axios');
const userInfoEmbed = require('../embeds/userinfo.embed');
const { YELLOW } = require('../utils/app-constants');

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'View information of a player in ToF.';

const selectMenu = (data) => {
  data.forEach(_ => ({ label: `${data.nickname} ${data.level} ${data.guildName}`, description: `${data.nickname} ${data.level} ${data.guildName}`, value: `${data.nickname} ${data.level} ${data.guildName}` }));

  const row = new ActionRowBuilder()
    .addComponents(
      new SelectMenuBuilder()
        .setCustomId('player-menu')
        .setPlaceholder('Found Matches') // TODO: Better placeholder?
        .addOptions(...data.map((_, i) => ({ label: _.nickname, description: `Level: ${_.level} — Crew: ${_.guildName}`, value: `${i}` })))
    );

  return row;
};

module.exports = {
  name: NAME,
  description: DESCRIPTION,
  type: 'tof',
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription(DESCRIPTION)
    .addStringOption(option =>
      option
        .setName('region')
        .setDescription('You character\'s region')
        .addChoices(
          { name: 'NA', value: 'na' },
          { name: 'SA', value: 'sa' },
          { name: 'AP', value: 'ap' },
          { name: 'EU', value: 'eu' },
          { name: 'SEA', value: 'sea' },
        )
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('name')
        .setDescription('You character\'s name')
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const region = await interaction.options.getString('region');
    const nickname = await interaction.options.getString('name');

    const response = (await axios({ url: 'https://tofapi.incin.net/scryglass/player/scan', method: 'get', params: { region, nickname } })).data;
    if (response.msg.includes('down') || response.msg.includes('maintenance')) return await interaction.editReply({ embeds: [{ color: YELLOW, title: 'Server temporarily down for maintenance' }] });

    const results = response.results.sort((a, b) => -((a.cs || 0) - (b.cs || 0)));
    const embed = userInfoEmbed(results[0]);

    if (results.length < 2) {
      await interaction.editReply({ embeds: [embed] });
    } else {
      await interaction.editReply({ components: [selectMenu(results)], embeds: [embed] });

      const filter = i => (i.customId === 'player-menu') && i.message.interaction.id === interaction.id;
      const collector = interaction.channel.createMessageComponentCollector({ time: 30000, filter });
      collector.on('collect', async i => {
        await i.update({ embeds: [userInfoEmbed(results[Number(i.values[0])])] });
        collector.resetTimer(); // Reset timer when user is still interacting
      });

      collector.on('end', async collected => {
        console.log(`Collected ${collected.size}`);
        await interaction.editReply({ components: [] });
      });
    }
  },
};
