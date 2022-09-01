const { SlashCommandBuilder } = require('discord.js');
const path = require('path');

const { embed, actions, gachaTypes } = require('../embeds/pulls.embed');

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'GACHAAAAAAAAAAAAAAAAA';

module.exports = {
  name: NAME,
  description: DESCRIPTION,
  type: 'tof',
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription(DESCRIPTION),
  async execute(interaction) {
    await interaction.reply({ content: gachaTypes.map(({ emoji, label, id }) => (`${emoji} — **${label}** ${id !== 'black-nucleus' ? '(*WIP*)' : ''}`)).join('\n'), components: [actions] });

    gachaTypes.forEach(type => {
      const filter = i => i.customId === type.id && i.message.interaction.id === interaction.id;
      const collector = interaction.channel.createMessageComponentCollector({ filter, maxComponents: 1, time: 15000 });
      collector.on('collect', async i => {
        await i.deferUpdate();
        await i.editReply({ content: '*Pulling Gacha...*', components: [] });

        const { pullsEmbed, attachment } = await embed(i.user.username, type);
        await i.editReply({ content: `<@${i.user.id}>`, embeds: [pullsEmbed], files: [attachment] });
      });

      collector.on('end', async collected => {
        console.log(`Collected ${collected.size}`);
        await interaction.editReply({ components: [] });
      });
    });
  },
};
