const path = require('path');
const { SlashCommandBuilder, ChannelType, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const CT = require('country-timezone');
const { RED } = require('../utils/app-constants');
const client = require("../../index")

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'View today\'s Joint Operations';

module.exports = {
  name: NAME,
  description: DESCRIPTION,
  type: 'tof',
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription(DESCRIPTION)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption(option =>
		option.setName('channel')
			.setDescription('The channel to echo into')
      .setRequired(true)
			.addChannelTypes(ChannelType.GuildText)
    )
    .addStringOption(option =>
      option.setName('country')
        .setDescription('Name of the simulacra')
       .setRequired(true)
    )
    .addStringOption(option => 
      option.setName('status')
        .setDescription('Set the status of daily channel')
        .setRequired(true)
        .setChoices(
          { name: 'Unable', value: 'unable' },
          { name: 'Disable', value: 'disable' },
        )
    ),
    
  async execute(interaction) {
    await interaction.deferReply();

    const channel = interaction.options.getChannel('channel');
    const country = interaction.options.getString('country');
    const set = interaction.options.getString('status');

    if (CT.getTimezones(country).length == 0) return await interaction.editReply({ embeds: [{ color: RED, title: 'Please enter a valid country name' }] });
    
    const timeZone = CT.getTimezones(country)[0];

    const embed = new EmbedBuilder()
      .setTitle('Game Daily Channel')
      .setColor('White')
      .setDescription('A message will be sent every day at 5am to inform about things to do on the game')
      .addFields(
        { name: ':earth_africa: TimeZone:', value: `\`${timeZone }\`` },
        { name: ':beginner: Server:', value: `\`${channel.guild.name}\`` },
        { name: ':keyboard: Channel:', value: `\`${channel.name}\`` },
        { name: ':gear: Status:', value: `\`${set}\`` },
      )
      .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
      .setTimestamp()

    interaction.editReply({ embeds: [embed] });
      
  },
};