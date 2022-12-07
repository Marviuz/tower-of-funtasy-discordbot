const path = require('path');
const { SlashCommandBuilder, ChannelType, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const CT = require('country-timezone');
const { RED } = require('../utils/app-constants');
const client = require('../../index');
const { gamedailychannelSchema } = require('../db/models/schema.game-daily-channel');
const schedule = require('node-schedule');
const { Channelexist, deleteChannel } = require('../db/models/Provider');

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
      option.setName('status')
        .setDescription('Set the status of daily channel')
        .setRequired(true)
        .setChoices(
          { name: 'Unable', value: 'unable' },
          { name: 'Disable', value: 'disable' },
        )
    )
    .addStringOption(option =>
      option.setName('country')
        .setDescription('Name of the country (default UTC+0)')
    ),
    
  async execute(interaction) {
    await interaction.deferReply();

    const channel = interaction.options.getChannel('channel');
    const set = interaction.options.getString('status');
    let country = interaction.options.getString('country');

    if (!country) { country = "island" } // UTC timeZone

    if (CT.getTimezones(country).length == 0) return await interaction.editReply({ embeds: [{ color: RED, title: 'Please enter a valid country name' }] });
    
    const timeZone = CT.getTimezones(country)[0];

    const embed = new EmbedBuilder()
      .setTitle('Game Daily Channel')
      .setColor('White')
      .setDescription('A message will be sent every day at 5am to inform about things to do on the game')
      .addFields(
        { name: ':earth_africa: TimeZone:', value: `\`${timeZone}\`` },
        { name: ':beginner: Server:', value: `\`${channel.guild.name}\`` },
        { name: ':keyboard: Channel:', value: `\`${channel.name}\`` },
        { name: ':gear: Status:', value: `\`${set}\`` },
      )
      .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
      .setTimestamp()

    const isSet = (await Channelexist(channel))

    if (isSet == 0) {
      if (set == 'disable') return await interaction.editReply({ embeds: [{ color: RED, title: 'The game daily system can be disabled on this channel beacause is not set' }] });
      
      interaction.editReply({ embeds: [embed] });

      await new gamedailychannelSchema({
        Guild_id: channel.guild.id,
        Channel_id: channel.id,
        TimeZone: timeZone
      }).save()

      const rule = new schedule.RecurrenceRule();
      rule.hour = new Date().getHours();
      rule.minute = new Date().getMinutes() + 1;
      rule.tz = timeZone;

      schedule.scheduleJob(rule, () => {
        channel.send("UWU")
      });


    } else {
      if (set == 'disable') {
        deleteChannel(channel)
        return interaction.editReply({ embeds: [embed] });
      }

      return await interaction.editReply({ embeds: [{ color: RED, title: 'Game daily information are already set for this channel' }] });
    }
    
  },
};