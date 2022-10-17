const { SlashCommandBuilder } = require('discord.js');
const path = require('path');

const matrices = require('../db/matrices.json');
const matrixEmbed = require('../embeds/matrix.embed');

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'View matrix details';

module.exports = {
  name: NAME,
  description: DESCRIPTION,
  type: 'tof',
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription(DESCRIPTION)
    .addStringOption(option => 
      option.setName(NAME)
        .setDescription('Name of the matrix')
        .setRequired(true)
        //.setChoices(...matrices.map(matrix => ({ name: matrix.name, value: matrix.name.toLowerCase() }))) choices must be <= 25 but they have 30 matrix
      ),
  async execute(interaction) {
    const matrix = await interaction.options.getString(NAME);

    const [match] = matrices.filter(({ name }) => name.toLowerCase() === matrix.toLowerCase());

    if (!match) return await interaction.reply('No match!'); // TODO: Better message

    const { embed, attachment } = matrixEmbed(match);
    await interaction.reply({ embeds: [embed], files: [attachment] });

  },
};