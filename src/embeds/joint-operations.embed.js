const { EmbedBuilder } = require('discord.js');
const { emojis } = require('../utils/app-constants');
const moment = require('moment-timezone');


function getNextDate(day) {
  const dateCopy = new Date();

  const nextDay = new Date(
    dateCopy.setDate(
      dateCopy.getDate() + ((7 - dateCopy.getDay() + day) % 7 || 7),
    ),
  );
  nextDay.setHours(5); nextDay.setMinutes(0); nextDay.setSeconds(0); nextDay.setMilliseconds(0);

  return nextDay;
}

module.exports = async (data, timeZone, setregionID) => {
  let dates = []
  let datemessage = "";
  let closerday = Date.now() + 864000000

  data.availability.forEach(date => {
    const day = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(date)
    const target = getNextDate(day)

    dates.push(target.getTime())
  })

  dates.forEach(day => {
    if (closerday - Date.now() > day - Date.now()) { closerday = day }
  });

  if (data.availability.includes(['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][new Date().getDay()])) {
    datemessage = "(Available) Ends in:";

    closerday = new Date(Date.now() + (new Date().getHours() < 5 ? 0 : 86400000))
    closerday.setHours(5); closerday.setMinutes(0); closerday.setSeconds(0); closerday.setMilliseconds(0);
  } else {
    datemessage = "Available in:";
  }

  let res = "";
  data.resistance.forEach(element => {
    if (element != "no resistance") {
      res += `${emojis[element]} ${element[0].toUpperCase() + element.slice(1)}, `;
    } else {
      res = ":x: " + element;
    }
  });

  closerday = new Date(closerday.getTime() + (new Date().getTimezoneOffset() * 60000)) // Set time to UTC

  if(timeZone != 0) closerday = new Date(closerday.getTime() + (moment().tz(timeZone).utcOffset() * 60000))


  const embed = new EmbedBuilder()
    .setTitle(data.name)
    .addFields(
      { name: 'Availability:', value: data.availability.map($ => `${$[0].toUpperCase() + $.slice(1)}`).join(', ') },
      { name: data.name === "Sadness Valley" || data.name === "The End Game" || data.name === "Carnival Party" || data.name === "Pursuit of Fate" ? "Enemy's Weakness:" : "Enemy's Resistances:", value: res },
      { name: datemessage, value: `<t:${Math.round(closerday / 1000)}:R> ${timeZone == 0 ? `\n_Your personal timezone has not been defined, use </setregion:${setregionID}> to set it_` : ""}` }
    )
    .setImage(data.img);

  return ({
    embed
  });
};
