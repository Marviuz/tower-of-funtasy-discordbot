const { EmbedBuilder } = require('discord.js');
const { emojis } = require('../utils/app-constants');

module.exports = async (data) => {
  let dates = []
  let datemessage = "";
  let closerday = Date.now()

  u = true
  if (u) {

    data.availability.forEach(date => {
      let day = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(date)
      
      let target = new Date();
      target.setDate(new Date().getDate() + ((7-(new Date().getDay()))%7+day)); // next day
      target.setHours(5); target.setMinutes(0); target.setSeconds(0); target.setMilliseconds(0);

      dates.push(target.getTime())
    })

    console.log(new Date(dates[0]))

    dates.forEach(day => {
      if (closerday < day) { closerday = day }
    });
  

    console.log(new Date(closerday))


    if (new Date().getDay() === new Date(closerday).getDay()) { closerday += 86400000; }

    //console.log(new Date(closerday))


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
      { name: datemessage, value: `<t:${Math.round(closerday / 1000)}:R>` }
    )
    .setImage(data.img);

  return ({
    embed
  });
};
