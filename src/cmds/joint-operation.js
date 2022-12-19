const path = require('path');
const { SlashCommandBuilder } = require('discord.js');
const jointOperations = require('../db/local/joint-operations.json');
const jointOperationsEmbed = require('../embeds/joint-operations.embed');
const { getUserTimezone } = require('../db/models/provider');

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'View today\'s Joint Operations';

module.exports = {
  name: NAME,
  description: DESCRIPTION,
  type: 'tof',
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription(DESCRIPTION)
    .addStringOption(option => option
      .setName('weekday')
      .setDescription('View today\'s/specific weekday\'s Join Operation')
      .addChoices(
        { name: 'Monday', value: 'monday' },
        { name: 'Tuesday', value: 'tuesday' },
        { name: 'Wednesday', value: 'wednesday' },
        { name: 'Thursday', value: 'thursday' },
        { name: 'Friday', value: 'friday' },
        { name: 'Saturday', value: 'saturday' },
        { name: 'Sunday', value: 'sunday' }
      )),
  async execute(interaction) {
    await interaction.deferReply();

    const selectedWeekday = interaction.options.getString('weekday');
    let selectedJo;
    if (selectedWeekday) {
      selectedJo = jointOperations.filter(_ => _.availability.includes(selectedWeekday));
    } else {
      const day = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][new Date().getDay()];
      selectedJo = jointOperations.filter(_ => _.availability.includes(day));
    }

    const timeZone = (await getUserTimezone(interaction.user.id))
    const setregionID = (await client.application.commands.fetch()).find(_ => _.name == "setregion");

    const _jointOps = selectedJo.map(async _ => await jointOperationsEmbed(_, timeZone, setregionID.id));
    Promise.all(_jointOps)
      .then(values => {
        interaction.editReply({ embeds: values.map(_ => _.embed) });
      });
  },
};