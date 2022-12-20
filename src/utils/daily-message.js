const { EmbedBuilder } = require("discord.js")
const client = require('../../index');
const dailydata = require('../db/local/daily-message.json')
const { emojis } = require("../utils/app-constants");

function formatString(string) {
    if (string.startsWith('matrix_')) string = string.substring(7);
    if (string.endsWith("_armor")) string = string.substring(string.length - 6, 0);

    string = string[0].toUpperCase() + string.slice(1);
    return string
}

function daily_message(TimeZone) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: TimeZone,
        weekday: 'long',
    })
    
    const weekday = formatter.formatToParts(new Date())[0].value;

    let jo = []
    dailydata[weekday]["jo"].forEach(data => {
        let res = ""
        data.resistance.forEach(element => {
            if (element != "no resistance") {
                res += `${emojis[element]} ${element[0].toUpperCase() + element.slice(1)}, `;
            } else {
                res = ":x: " + element;
            }
        });

        jo.push({ name: data.name, value: "\`Rewards:\` " + data.rewards.map($ => `${emojis[$]}  ${ formatString($) }`).join(", ") + `\n \`${data.name === "Sadness Valley" || data.name === "The End Game" ? "Weakness" : "Resistances"}:\` ${res} ${dailydata[weekday]["jo"].indexOf(data)+1 == dailydata[weekday]["jo"].length ? "\n\nTo see **more details** please use the </joint-operation:1021352197860098088> command" : ""}` })
    });

    const embed = new EmbedBuilder()
        .setTitle("Today's availability " + `(${weekday})`)
        .setColor('White')
        .setDescription("**Joint Operations available**:\n")
        .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setTimestamp()
        .addFields(
            ...jo,
            { name: "Other:", value: dailydata[weekday]["Other"].map($ => $).join("\n") }
        )
      
    return embed
}


module.exports = daily_message