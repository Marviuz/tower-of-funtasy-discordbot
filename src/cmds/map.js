const path = require('path');
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'Get all interactive maps links';

module.exports = {
  name: NAME,
  description: DESCRIPTION,
  type: 'tof',
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription(DESCRIPTION)
    .addStringOption(option =>
      option.setName(NAME)
        .setDescription('Name of the map')
        .setRequired(true)
        .setChoices(
          { name: 'Aesperia', value: 'Aesperia 1 https://i8.ae/GRBPr' },
          { name: 'Artificial Island', value: 'Artificial Island 2 https://i8.ae/PgFZC' },
          { name: 'Third City', value: 'Third City 6 https://i8.ae/CLYvG' },
          { name: 'Confounding Labyrintn', value: 'Confounding Labyrintn 7 https://i8.ae/CLYvG' },
          { name: 'City Gate', value: 'City Gate 8 https://i8.ae/CLYvG' },
          { name: 'Grayspace', value: 'Grayspace 9 https://i8.ae/YpkKf' },
          { name: 'Mirroria', value: 'Mirroria 10 https://i8.ae/mdItr' },
          { name: 'Vera', value: 'Vera 11 https://i8.ae/jqKuz' },
          { name: 'The Grand Sea Island', value: 'The Grand Sea Island 12 https://i8.ae/CLYvG' },
          { name: 'Innars', value: 'Innars 13 https://i8.ae/CLYvG' },
          { name: 'Dragon Breath Volcano', value: 'Dragon Breath Volcano 14 https://i8.ae/CLYvG' },
        )
    ),
  async execute(interaction) {
    const map = await interaction.options.getString(NAME);

    const button = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel(`${map.split(' ').slice(0, -2)[0] === "<:CN:1035098249687744542>" ? map.split(' ').slice(1, -2).join(' ') : map.split(' ').slice(0, -2).join(' ')}  Map!`)
          .setStyle('Link')
          .setURL(`https://toweroffantasy.interactivemap.app/?map=${map.split(' ').slice(0, -1).pop()}`),
      );

    const embed = new EmbedBuilder()
      .setTitle(map.split(' ').slice(0, -2).join(' '))
      .setColor('White')
      .setURL(`https://toweroffantasy.interactivemap.app/?map=${map.split(' ').slice(0, -1).pop()}`)
      .setImage(map.split(' ').pop());

    await interaction.reply({ embeds: [embed], components: [button] });
  },
};
