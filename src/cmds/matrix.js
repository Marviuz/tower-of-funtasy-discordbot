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
      option.setName("rarity")
        .setDescription('Quality of the matrix')
        .setRequired(true)
        .setChoices(
          { name: "SSR", value: "SSR"},
          { name: "SR", value: "SR"},
          { name: "R", value: "R" },
          { name: "N", value: "N"}
        )
      )
      .addStringOption(optionn => 
        optionn.setName(NAME)
          .setDescription('Name of the matrix')
          .setRequired(true)
          .setAutocomplete(true)
      ),
  
  async autocomplete(interaction) {
    const matrixs = matrices.filter(matrix => matrix.rarity === interaction.options.getString("rarity"))

		await interaction.respond(
			matrixs.map(matrix => ({ name: matrix.name, value: matrix.name.toLowerCase() })),
		);
  },


  async execute(interaction) {
    const matrix = await interaction.options.getString(NAME);

    const [match] = matrices.filter(({ name }) => name.toLowerCase() === matrix.toLowerCase());

    if (!match) return await interaction.reply('No match!'); // TODO: Better message

    const { embed, attachment } = matrixEmbed(match);
    await interaction.reply({ embeds: [embed], files: [attachment] });

  },
};