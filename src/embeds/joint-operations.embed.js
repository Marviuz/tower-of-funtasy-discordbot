const { EmbedBuilder } = require('discord.js');
const jointOperations = require('../db/joint-operations.json');
const { emojis } = require('../utils/app-constants');

module.exports = async (data) => {
  let date = data.timestamp[0]
  let datemessage = "";

  if(new Date().getHours() >= 5 && (new Date().getDay()-1)%7 != new Date(data.timestamp[0] * 1000).getDay() || new Date().getHours() >= 5 && (new Date().getDay()-1)%7 != new Date(data.timestamp[1] * 1000).getDay()) {

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
      date = jointOperations.filter(_ => _.availability.includes(['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][(new Date(date * 1000).getDay())]))[0].timestamp[0]
    } else {
      datemessage = "Available in:"
    }

  } else {
    date -= 518400
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
      { name: datemessage, value: `<t:${date}:R>` }
    )
    .setImage(data.img);

  return ({
    embed
  });
};
