const path = require('path');
const { SlashCommandBuilder } = require('discord.js');
const { RED, emojis } = require('../utils/app-constants');

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'Calculates the percentage of critical according to the crit and the level';

const solveCritRate = (crit, level) => {
  let multiplier;

  if (level <= 9) multiplier = { a: 0, b: 150, c: 0 };
  else if (level <= 40) multiplier = { a: -4, b: 408, c: -2078 };
  else if (level <= 100) multiplier = { a: -0.163, b: 285, c: -3215 };
  else throw new Error('Crit Error');

  return crit / ((multiplier.a * (level * level)) + (multiplier.b * level) + (multiplier.c));
};

module.exports = {
    name: NAME,
    description: DESCRIPTION,
    type: 'tof',
    data: new SlashCommandBuilder()
        .setName(NAME)
        .setDescription(DESCRIPTION)
        .addStringOption(option =>
            option.setName('level')
              .setDescription('Your current level')
              .setRequired(true)
        )
        .addStringOption(option =>
          option.setName('crit')
            .setDescription('Your current critical')
            .setRequired(true)
        ),

    async execute(interaction) {
        const crit = interaction.options.getString('crit');
        const level = interaction.options.getString('level');
    
        const critRate = solveCritRate(crit, level)*100

        return interaction.reply({ embeds: [{ color: 0xffffff, title: `Your crit rate is:`, description: `\`${critRate.toFixed(2)}%\`` }] });
  },
};
