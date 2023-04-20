const path = require('path');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { goldNucleus, emojis } = require('../utils/app-constants');

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'See all passwords for chests and doors in the map';

module.exports = {
  name: NAME,
  description: DESCRIPTION,
  type: 'tof',
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription(DESCRIPTION),

  async execute(interaction) {
    const embed = new EmbedBuilder()
        .setColor("White")
        .setTitle(`List of passwords`)
        .addFields(
          { name: 'HT201 Shelter (85.0, 967.2)', value: "`password`: 1647\n`reward`: " + `${emojis["supplypodii"]} Type 2 Supply Pod`, inline: true},
          { name: 'Navia Bay (-537.1, -449.9)', value: "`password`: 2202\n`reward`: " + `${emojis["supplypodi"]} Type 1 Supply Pod`, inline: true},
          { name: 'Cetus Island (638.5, -847.2)', value: "`password`: 3344\n`reward`: " + `${emojis["supplypodi"]} Type 1 Supply Pod`, inline: true},
          { name: 'Miner’s Camp (376.3, 245.5)', value: "`password`: 4753\n`reward`: " + `${goldNucleus} Gold Nucleus`, inline: true},
          { name: 'Crescent Shore	 (779.0, 644.2)', value: "`password`: 1024\n`reward`: " + `${emojis["supplypodii"]} Type 2 Supply Pod`, inline: true},
          { name: 'Seaforth Dock (508.1, 767.5)', value: "`password`: 3594\n`reward`: "+ `${emojis["supplypodi"]} Type 1 Supply Pod`, inline: true},
          { name: 'The Lumina (736.7, 851.5)', value: "`password`: 7268\n`reward`: " + `${goldNucleus} Gold Nucleus`, inline: true},
          { name: 'Aarniel Fortress (380.7, -832.5)', value: "`password`: 8521\n`reward`: " + `${goldNucleus} Gold Nucleus`, inline: true},
          { name: 'Warren Snowfield (651.1, -1242.8)', value: "`password`: 7092", inline: true},
          { name: 'Raincaller Island Tower (-757.8, -569.9)', value: "`password`: 5972", inline: true},
          { name: 'Ruins D-02:', value: ":green_circle: `Easy`: 2887\n :orange_circle: `Normal`: 0713\n :red_circle: `Hard`: 1027"},
        )
        .setImage("https://i.imgur.com/ics7XjG.png")
        
    await interaction.reply({ embeds: [embed] });
  },
};