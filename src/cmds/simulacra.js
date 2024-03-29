const { SlashCommandBuilder } = require('discord.js');
const path = require('path');

const simulacra = require('../db/local/simulacra.json');
const simulacraCN = require('../db/local/cn/simulacra.cn.json');
const simulacraEmbed = require('../embeds/simulacra.embed');

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
      option.setName("element")
        .setDescription('Element of simulacra')
       .setRequired(true)
       .setChoices(
        { name: "Flame", value: "flame" },
        { name: "Volt", value: "volt" },
        { name: "Frost", value: "ice" },
        { name: "Physical", value: "physical" },
        { name: "Altered", value: "aberration" }
      )
    )
    .addStringOption(option =>
      option.setName(NAME)
        .setDescription('Name of the simulacra')
        .setRequired(true)
        .setAutocomplete(true)
    ),

  async autocomplete(interaction) {
    const simulacras = [...simulacraCN].filter(simulacra => simulacra.element === interaction.options.getString("element"));

    await interaction.respond(
      simulacras.map(simulacra => ({ name: simulacra.name, value: simulacra.name.toLowerCase() })),
    );
  },
  
  async execute(interaction) {
    await interaction.deferReply();
    const simulacrum = await interaction.options.getString(NAME);

    const [match] = [...simulacra, ...simulacraCN].filter(({ name }) => name.toLowerCase() === simulacrum.toLowerCase());

    const { embed, actions, buttons } = simulacraEmbed(match);

    await interaction.editReply({ embeds: [embed.basicDetails], components: [actions('basicDetails')] });

    let page = "basicDetails"
    let CN = ""

    buttons.forEach(button => {
      const filter = i => i.customId === button.id && i.message.interaction.id === interaction.id;
      const collector = interaction.channel.createMessageComponentCollector({ filter });
      collector.on('collect', async i => {
        await i.deferUpdate();
        if (i.customId == 'cn' || i.customId == 'global') {
          button.emoji === '🌍' ? button.emoji = '<:CN:1035098249687744542>' : button.emoji = '🌍'
          button.id === 'global' ? button.id = 'cn' : button.id = 'global'
          button.label === 'global' ? button.id = 'cn' : button.id = 'cn'
          CN === '' ? CN = 'CN' : CN = ''
          
          await i.editReply({ embeds: [embed[page+CN]], components: [actions(page+CN)] });
        } else {
          page = button.id;
          await i.editReply({ embeds: [embed[button.id+CN]], components: [actions(button.id+CN)] });
        }        
      });

      collector.on('end', async collected => {
        console.log(`Collected ${collected.size} items`);
        await interaction.editReply({ components: [] });
      });
    });
  },
};
