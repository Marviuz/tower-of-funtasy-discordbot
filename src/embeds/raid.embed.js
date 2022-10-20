const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { emojis } = require("../utils/app-constants")

const raidEmbed = ({ name, weakness, level, cs, boss, mecanims, rewards }) => {

    let reset = 1665975600
    while (Math.round(Date.now() / 1000) > reset) {
      reset += 604800
    }

    console.log(weakness.map($ => `${emojis[$]} ${$.Upper}: ${$.toUpperCase()}`).join(", "))

  return {
    embed: new EmbedBuilder()
      .setColor("Purple")
      .setTitle(name)
      .addFields(
        { name: "Weakness:", value: weakness.map($ => `${emojis[$]} ${$.toUpperCase()}`).join(", "), inline: true},
        { name: "Level:", value: `${level}`, inline: true},
        { name: "CS:", value: `${cs}`, inline: true},
        { name: "Rewards:", value: rewards.map($ => `${emojis[$.name.toLowerCase().replace(/ /g,'')]} ${$.name}: ${$.value}`).join("\n"), inline: true},
        { name: "Team:", value: `${emojis["dps"]} Attack x4\n ${emojis["support"]} Benediction x2\n ${emojis["defense"]} Fortitude x2`, inline: true},
        { name: "Boss:", value: boss, inline: true},
        { name: "Reset:", value: `<t:${reset}:R>`},
        { name: "Mecanims:", value: mecanims }
    ),
  };
};


//1500 15
//1800 20


/* 

{
  name: 'Midlevel Control Room',
  weakness: 'ice',
  level: 60,
  CS: 36000,
  mecanims: '● Apophis does not have a shield here\n' +
    '● Blast attack has huge radius, can be blocked with Omnium Handcannon\n' +
    '● Generally the same attack pattern as the Apophis World Boss',
  rewards: [
    { name: 'Energy Crystal Dust', value: 1200 },
    { name: 'Cluster', value: 10 }
  ]
}

*/

module.exports = raidEmbed;