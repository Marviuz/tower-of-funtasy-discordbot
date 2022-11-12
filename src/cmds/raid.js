const path = require('path');
const { SlashCommandBuilder } = require('discord.js');
const raids = require('../db/raid.json') 
const raidEmbed = require('../embeds/raid.embed')

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'View raid detail';

module.exports = {
  name: NAME,
  description: DESCRIPTION,
  type: 'others',
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription(DESCRIPTION)
    .addStringOption(option =>
      option
        .setName("difficulty")
        .setDescription('Difficulty of the raid')
        .setRequired(true)
        .setChoices(
          { name: "Normal", value: "normal" },
          { name: "Heroic", value: "heroic" }
        )
    )
    .addStringOption(option => 
        option
          .setName(NAME)
          .setDescription('Name of the simulacra')
          .setRequired(true)
          .addChoices(
            { name: "Midlevel Control Room", value: "Midlevel Control Room" },
            { name: "Phantasmic Zenith", value: "Phantasmic Zenith" },
            { name: "Shattered Realm", value: "Shattered Realm" },
            { name: "Battle Test Area", value: "Battle Test Area" }
          )
        ),
  async execute(interaction) {
    const raid = interaction.options.getString(NAME)
    const difficulty = interaction.options.getString("difficulty")

    const [match] = raids.filter(({ name }) => name.toLowerCase() === raid.toLowerCase());

    const { embed } = raidEmbed(match[difficulty]);
    await interaction.reply({ embeds: [embed] });

  },
};