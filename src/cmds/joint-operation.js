const path = require('path');
const { SlashCommandBuilder } = require('discord.js');
const jointOperations = require('../db/joint-operations.json');
const jointOperationsEmbed = require('../embeds/joint-operations.embed');

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
      const today = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][new Date().getDay()];
      selectedJo = jointOperations.filter(_ => _.availability.includes(today));
    }

    const _jointOps = selectedJo.map(async _ => await jointOperationsEmbed(_));
    Promise.all(_jointOps)
      .then(values => {
        interaction.editReply({ embeds: values.map(_ => _.embed) });
      });
  },
};