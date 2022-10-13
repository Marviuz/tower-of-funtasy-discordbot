const { EmbedBuilder, version } = require('discord.js');
const rarities = require('../db/rarities.json');
var cpuStat = require('cpu-stat');
const { repository } = require('../../package.json');

const client = require("../../index")

const botinfoEmbed = () => {
    const result = new EmbedBuilder()
        .setColor("White")
        .setTitle('Some title')
        .setURL('https://discord.js.org/')
        .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
        .setDescription('Some description here')
        .setThumbnail('https://i.imgur.com/AfFp7pu.png')
        .setTimestamp()
        .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

  return result;
};

module.exports = botinfoEmbed;



/*

const { MessageEmbed, version } = require('discord.js');
const { Command, CommandoMessage } = require('discord.js-commando');
const { botversion, repository } = require('../../package.json');
const { botimage, botname} = require('../../config.js');
var cpuStat = require('cpu-stat');
const prettyMilliseconds = require('pretty-ms');

module.exports = class BotInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'botinfo',
            group: 'utilitaire',
            memberName: 'botinfo',
            description: "La commande botinfo permet d'afficher plusieur information sur le bot",
            examples: ["botinfo"]
        })
    }

    

     async run(message) {
        let totalMembers = 0
        const client = this.client

        let commandlist = [];
        let catelist = 0
        for (let i = 2; i < this.client.registry.groups.size; i++) {
            catelist++
            for (var index = 0; index < this.client.registry.groups.toJSON()[i].commands.length; index++) {
                commandlist.push(this.client.registry.groups.toJSON()[i].commands[index])
            }
        }

        for (const guild of this.client.guilds.cache) {
            totalMembers += (await guild[1].members.fetch()).size
        }
        
        cpuStat.usagePercent(function(err, percent, seconds) {

            const embed = new MessageEmbed()
            .setColor('BLUE')
            .setFooter(botname,botimage)
            .setAuthor(
                `Information de ${botname}`,
                client.user.displayAvatarURL()
            )
            .addField("Information du bot:", [
                `:hash: **Tag du bot:** ${client.user.tag}`,
                `:gear: **Version du bot :** ${botversion}`,
                `:pushpin: **Préfix du bot :** ${message.guild.commandPrefix}`,
                `<:discorddeveloperbadge:892323387408519218> **Développeur :** WIZI#3492`
            ].join("\n"))
            .addField("Information Serveurs:", [
                `:notepad_spiral: **Nombre de server :** ${client.guilds.cache.size}`,
                `:abacus: **Membres au total :** ${totalMembers}`
            ].join("\n"))
            .addField("Stats des Commands:", [
                `:bookmark_tabs: **Nombre de Command :** ${commandlist.length}`,
                `:clipboard: **Nombre de catégories :** ${catelist}`
              ].join("\n"))
            .addField("Versions:", [
                `<:nodejs:892323938397483018> **Version de Node.js :** ${process.version}`,
                `<:discordjs:892324059847741490> **Version de Discord.js :** v${version}`
              ].join("\n"))
            .addField('Statistique machine:', [
                `:chart_with_downwards_trend: **Total De Memoir utiliser :** ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
                `:bar_chart: **Memoire Utiliser :** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
                `:chart_with_upwards_trend: **Pourcentage du CPU :** ${Math.round(percent)}%`,
                `:arrows_counterclockwise: **Dernier restart :** ${prettyMilliseconds(process.uptime().toFixed(2) * 1000)}`
            ].join("\n"))
            .addField("Liens:", [
                `<:github:892323399806890084> [Repository Github](${repository.url.replace('.git', ' ')})`,
                ":globe_with_meridians: [Site Web](amaterasu-sup.great-site.net)"
            ].join("\n"))

            embed.setTimestamp()

        message.say(embed)

        })
    }
}

*/