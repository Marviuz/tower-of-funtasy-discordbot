const { EmbedBuilder } = require('discord.js');
const { emojis } = require('../utils/app-constants');

module.exports = async (data) => {
  let date = data.timestamp[0];
  let date2 = data.timestamp[1];
  let datemessage = "";


  if (new Date().getHours() >= 5 && (new Date().getDay() - 1) % 7 != new Date(data.timestamp[0] * 1000).getDay() || new Date().getHours() >= 5 && (new Date().getDay() - 1) % 7 != new Date(data.timestamp[1] * 1000).getDay()) {

    // get the day of the reset (the next day)    
    if (new Date().getDay() === new Date(date * 1000).getDay()) { date += 86400; }
    
    if (new Date().getDay() === new Date(date2 * 1000).getDay()) { date2 += 86400; }

    
    while (Date.now() > date * 1000) { date += 604800; }

    while (Date.now() > date2 * 1000) { date2 += 604800; }


    // we compare the dates of the 2 days when the jo is available to know which is the closest 
    if (date - Math.round(Date.now() / 1000) > date2 - Math.round(Date.now() / 1000)) { date = date2; }

    // UTC management
    date += (new Date().getHours() - new Date().getUTCHours()) * 3600

    if (data.availability.includes(['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][new Date().getDay()])) {
      datemessage = "(Available) Ends in:";
    } else {
      datemessage = "Available in:";
    }

  } else {
    date += 86400;
    while (Math.round(Date.now() / 1000) > date) {
      date += 604800;
    }

    datemessage = "(Available) Ends in:";
  }

  let res = "";
  data.resistance.forEach(element => {
    if (element != "no resistance") {
      res += `${emojis[element]} ${element}, `;
    } else {
      res = ":x: " + element;
    }
  });

  const embed = new EmbedBuilder()
    .setTitle(data.name)

    .addFields(
      { name: 'Availability:', value: data.availability.join(', ') },
      { name: 'Enemy Resistances:', value: res },
      { name: datemessage, value: `<t:${date}:R>` }
    )
    .setImage(data.img);

  return ({
    embed
  });
};
