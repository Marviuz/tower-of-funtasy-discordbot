const { EmbedBuilder } = require('discord.js');
const { emojis } = require('../utils/app-constants')
const moment = require('moment-timezone');

const raidEmbed = ({ name, weakness, level, cs, boss, mecanims, rewards }, timeZone, setregionID) => {
    const dateCopy = new Date();
 
    let reset = new Date(
      dateCopy.setDate(
        dateCopy.getDate() + ((7 - dateCopy.getDay() + 1) % 7 || 7),
      ),
    );
    reset.setHours(5); reset.setMinutes(0); reset.setSeconds(0); reset.setMilliseconds(0);
    reset = new Date(reset.getTime() + (new Date().getTimezoneOffset() * 60000)) // Set time to UTC

    if(timeZone != 0) reset = new Date(reset.getTime() + (moment().tz(timeZone).utcOffset() * 60000))
    
  return {
    embed: new EmbedBuilder()
      .setColor('Purple')
      .setTitle(name)
      .addFields(
        { name: 'Weakness:', value: weakness.map($ => `${emojis[$]} ${$.toUpperCase()}`).join(', '), inline: true},
        { name: 'Level:', value: `${level}`, inline: true},
        { name: 'CS:', value: `${cs}`, inline: true},
        { name: 'Rewards:', value: rewards.map($ => `${$.name != 'Falcon Combat Engine' ? emojis[$.name.toLowerCase().replace(/ /g,'')] : emojis['bluecore']} ${$.name}: ${$.value}`).join('\n'), inline: true},
        { name: 'Team:', value: `${emojis['dps']} Attack x4\n ${emojis['support']} Benediction x2\n ${emojis['defense']} Fortitude x2`, inline: true},
        { name: 'Boss:', value: boss, inline: true},
        { name: 'Reset:', value: `<t:${Math.round(reset / 1000)}:R> ${timeZone == 0 ? `\n_Your personal timezone has not been defined, use </setregion:${setregionID}> to set it_` : ""}`},
        { name: 'Mecanims:', value: mecanims }
    ),
  };
};

module.exports = raidEmbed;