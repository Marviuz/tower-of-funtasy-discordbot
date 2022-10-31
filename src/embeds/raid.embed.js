const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { emojis } = require("../utils/app-constants")

const raidEmbed = ({ name, weakness, level, cs, boss, mecanims, rewards }) => {

    let reset = 1665975600
    while (Math.round(Date.now() / 1000) > reset) {
      reset += 604800
    }

    // UTC management
    reset += (new Date().getHours() - new Date().getUTCHours()) * 3600

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

module.exports = raidEmbed;