const { SlashCommandBuilder } = require('discord.js');
const path = require('path');

const { getMatrix } = require('../controllers/matrices.controller');
const matrixEmbed = require('../embeds/matrix.embed');
const { RED } = require('../utils/colors');

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'View matrix details';

module.exports = {
  name: NAME,
  description: DESCRIPTION,
  type: 'tof',
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription(DESCRIPTION)
    .addStringOption(option => option.setName(NAME).setDescription('Name of the matrix').setRequired(true)),
  async execute(interaction) {
    await interaction.deferReply();

    const matrix = await interaction.options.getString(NAME);
    const match = await getMatrix(matrix);

    if (!match) return await interaction.editReply({ embeds: [{ title: 'Matrix not found!', color: RED }] });

    const { embed, attachment } = matrixEmbed(match);
    await interaction.editReply({ embeds: [embed], files: [attachment] });

  },
};
