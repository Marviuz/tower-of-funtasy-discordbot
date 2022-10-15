const { EmbedBuilder, version } = require('discord.js');
const { repository } = require('../../package.json');
const prettyMilliseconds = require("pretty-ms")
const path = require("path")
const fs = require('fs')

const client = require("../../index")


const botinfoEmbed = () => {

    let totalMembers = 0
    let totalCommands = 0

    client.guilds.cache.forEach(guild => {
        totalMembers += guild.memberCount
    });

    fs.readdirSync(path.join(__dirname, '../cmds')).filter(file => file.endsWith('.js')).forEach(command => {
        totalCommands += 1
    })

    var startTime  = process.hrtime()
    var startUsage = process.cpuUsage()

    // spin the CPU for 500 milliseconds
    var now = Date.now()
    while (Date.now() - now < 500)

    var elapTime = process.hrtime(startTime)
    var elapUsage = process.cpuUsage(startUsage)

    var cpuPercent = Math.round(100 * (secNSec2ms(elapUsage.user) + secNSec2ms(elapUsage.system)) / secNSec2ms(elapTime))

    function secNSec2ms (secNSec) {
        if (Array.isArray(secNSec)) { 
            return secNSec[0] * 1000 + secNSec[1] / 1000000; 
        }
        return secNSec / 1000;
    }

    const embed = new EmbedBuilder()
        .setColor("White")
        .setAuthor(
            { 
                name: `Informations about ${client.user.username}`, 
                iconURL: client.user.displayAvatarURL() 
            }
        )

        .addFields(
            { 
                name: 'Basical information:',
                value:`
                :hash: **Tag :** ${client.user.tag}
                :gear: **Version :** ${require("../../package.json").version}
                :pushpin: **Prefix :** /
                <:discorddeveloperbadge:892323387408519218> **Developers :** Marviuz#8781
                `
            },
            { 
                name: 'Servers information:',
                value:`
                :notepad_spiral: **Number of server :** ${client.guilds.cache.size}
                :abacus: **Members in total :** ${totalMembers}
                `
            },
            { 
                name: 'Commands information:',
                value:`
                :bookmark_tabs: **Number of command :** ${totalCommands}
                `
            },
            { 
                name: 'System version:',
                value:`
                <:nodejs:892323938397483018> **Node.js version:** ${process.version}
                <:discordjs:892324059847741490> **Discord.js version:** v${version}
                `
            },
            { 
                name: 'Machine statistics:',
                value:`
                :chart_with_downwards_trend: **Total memory used :** ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB
                :bar_chart: **Memory used :** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
                :chart_with_upwards_trend: **CPU percent :** ${cpuPercent}%
                :arrows_counterclockwise: **Last restart :** ${prettyMilliseconds(process.uptime().toFixed(2) * 1000)}
                `
            },
            { 
                name: 'Links:',
                value:`
                <:github:892323399806890084> [Github Repository](${repository.url.replace('.git', ' ')})
                :globe_with_meridians: Website not available
                `
            },
        )

  return embed;
};

module.exports = botinfoEmbed;