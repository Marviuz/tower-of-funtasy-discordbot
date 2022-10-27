const { SlashCommandBuilder } = require('discord.js');
const path = require('path');

const simulacra = require('../db/simulacra.json');
const simulacraCn = require('../db/cn/simulacra.cn.json');
const simulacraEmbed = require('../embeds/simulacra.embed');
const { ZERO_WIDTH_SPACE, emojis } = require('../utils/app-constants');

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'View simulacra details';

module.exports = {
  name: NAME,
  description: DESCRIPTION,
  type: 'tof',
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription(DESCRIPTION)
    .addStringOption(option =>
      option.setName(NAME)
        .setDescription('Name of the simulacra')
      // .setRequired(true)
      // .addChoices(...[...simulacraCn, ...simulacra].map(simulacra => ({ name: simulacra.name, value: simulacra.name.toLowerCase() })))
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const simulacrum = await interaction.options.getString(NAME);

    if (!simulacrum) return await interaction.editReply({ embeds: [{ title: 'Simulacra', fields: [{ name: ZERO_WIDTH_SPACE, value: [...simulacra, ...simulacraCn].map(_ => (_.chinaOnly ? `${_.name} ${emojis.cn}` : _.name)).sort().join('\n') }] }] });

    const [match] = [...simulacra, ...simulacraCn].filter(({ name }) => name.toLowerCase() === simulacrum.toLowerCase());

    if (!match) return await interaction.editReply('No match!'); // TODO: Better message

    const { embed, actions, buttons } = simulacraEmbed(match);
    await interaction.editReply({ embeds: [embed.basicDetails], components: [actions('basicDetails')] });

    buttons.forEach(button => {
      const filter = i => i.customId === button.id && i.message.interaction.id === interaction.id;
      const collector = interaction.channel.createMessageComponentCollector({ filter });
      collector.on('collect', async i => {
        await i.deferUpdate();
        await i.editReply({ embeds: [embed[button.id]], components: [actions(button.id)] });
      });

      collector.on('end', async collected => {
        console.log(`Collected ${collected.size} items`);
        await interaction.editReply({ components: [] });
      });
    });
  },
};
