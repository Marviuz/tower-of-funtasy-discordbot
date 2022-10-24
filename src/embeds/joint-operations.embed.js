const { EmbedBuilder } = require('discord.js');
const { emojis } = require('../utils/app-constants');

module.exports = async (data) => {
  let date = data.timestamp[0]
  let date2 = data.timestamp[1]
  let datemessage = "";


  if(new Date().getHours() >= 5 && (new Date().getDay()-1)%7 != new Date(data.timestamp[0] * 1000).getDay() || new Date().getHours() >= 5 && (new Date().getDay()-1)%7 != new Date(data.timestamp[1] * 1000).getDay()) {

    if(new Date().getDay() === new Date(date * 1000).getDay()) {
      date += 86400
    }

    while (Math.round(Date.now() / 1000) > date) {
      date += 604800
    }

    while (Math.round(Date.now() / 1000) > date2) {
      date2 += 604800
    }

    if (date - Math.round(Date.now() / 1000) > date2 - Math.round(Date.now() / 1000)) {
      date = date2
    }

    if (data.availability.includes(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][(new Date(Date.now()).getDay()-1)%7])) {
      datemessage = "(Available) Ends in:"
    } else {
      datemessage = "Available in:"
    }

  } else {
    date +=86400
    while (Math.round(Date.now() / 1000) > date) {
      date += 604800
    }
    date -= 86400

    datemessage = "(Available) Ends in:"
  }

  let res = ""
  data.resistance.forEach(element => {
    if (element != "no resistance") {
        res += `${emojis[element]} ${element}, `
      } else {
        res = ":x: " + element
      }
  });

  const embed = new EmbedBuilder()
    .setTitle(data.name)

    .addFields(
      { name: 'Availability:', value: data.availability.join(', ') },
      { name: 'Enemy Resistances:', value: res },
      { name: datemessage, value: `<t:${date}:R> ||(UTC+2)||` }
    )
    .setImage(data.img);

  return ({
    embed
  });
};
