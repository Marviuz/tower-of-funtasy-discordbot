const path = require('path');
const { SlashCommandBuilder } = require('discord.js');
const CT = require('country-timezone');
const { RED } = require('../utils/app-constants');
const { userSchema } = require('../db/models/schema.user');
const { getUserTimezone, editUserTimezone } = require('../db/models/provider');

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'Allows to adapt the time displayed according to the region';

module.exports = {
  name: NAME,
  description: DESCRIPTION,
  type: 'others',
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription(DESCRIPTION)
    .addStringOption(option => option
        .setName('region')
        .setDescription('Allows to adapt the time displayed according to the region')
        .setRequired(true)
        ),
  async execute(interaction) {
    let country = interaction.options.getString('region');

    if (CT.getTimezones(country).length == 0) return await interaction.reply({ embeds: [{ color: RED, title: 'Please enter a valid country name' }] });

    const timeZone = CT.getTimezones(country)[0];
    const userTimezone = (await getUserTimezone(interaction.user.id))

    if (userTimezone == 0) {
        await new userSchema({
            id: interaction.user.id,
            TimeZone: timeZone
        }).save();

        return interaction.reply({ embeds: [{ color: 5763719, title: `Your time zone has been set to \`${timeZone}\`` }] })
    } else {
        if (userTimezone == timeZone) return interaction.reply({ embeds: [{ color: RED, title: `Your timezone is already set to \`${timeZone}\`` }] })

        interaction.reply({ embeds: [
            { 
                color: 5763719 , 
                title: `:infinity: Timezone change for **${interaction.user.username}**`,
                fields: [
                    { name: "Old Timezone:", value: `\`${userTimezone}\`` },
                    { name: "New Timezone:", value: `\`${timeZone}\`` }
                ]
            }]
        })

        await editUserTimezone(interaction.user.id, timeZone)
    }
  },
};