const path = require('path');
const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const teamsData = require('../db/local/teams.json');
const simulacraData = require('../db/local/charInfo.json');
const { createCanvas, loadImage } = require('canvas');
const { roles, elements, arrow } = require("../utils/app-constants");

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'Allows giving meta teams according to different characteristics';


function goToCompLink(characterNames) {
  const searchParams = encodeURIComponent(JSON.stringify(characterNames));
  const url = 'https://teammaker.lunarheart.repl.co/results/comp/info.html?characterNames=' + searchParams;

  return url;
}

module.exports = {
  name: NAME,
  description: DESCRIPTION,
  type: 'tof',
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription(DESCRIPTION)
    .addStringOption(option => option
      .setName('role')
      .setDescription('Role of the team')
      .setRequired(true)
      .addChoices(
        { name: 'Attack', value: 'attack' },
        { name: 'Fortitude', value: 'fortitude' },
        { name: 'Benediction', value: 'benediction' },
        { name: 'Balance', value: 'balance' },
        { name: 'All', value: 'all'}
      )
    )
    .addStringOption(option => option
      .setName('element')
      .setDescription('Element of the team')
      .setRequired(true)
      .addChoices(
        { name: 'Frost', value: 'frost' },
        { name: 'Flame', value: 'flame' },
        { name: 'Volt', value: 'volt' },
        { name: 'Physical', value: 'physical' },
        { name: 'Altered', value: 'altered' },
        { name: 'Rainbow', value: 'rainbow'},
        { name: 'None', value: 'none' },
        { name: 'All', value: 'all' },
      )
    ),

  async execute(interaction) {
    const role = interaction.options.getString('role');
    const element = interaction.options.getString('element');


    if ( role === "all" && element === "all" ) {
      var teams = [];
      for (const element in teamsData) {
        for (const role in teamsData[element]) {
          teams = teams.concat(teamsData[element][role])
        }
      }
      teams.pop();
    } else if ( role === "all" ) {
      var teams = [];
      for (const role in teamsData[element]) {
        teams = teams.concat(teamsData[element][role])
      }
    } else if ( element === "all" ) {
      var teams = [];
      for (const elements in teamsData) {
        teams = teams.concat(teamsData[elements][role])
      }
    } else {
      var teams = teamsData[element][role];
    }

    /* Error handling */

    const noMatch = new EmbedBuilder()
      .setColor("Red")
      .setTitle(":x: No team found")
    
    const toMany = new EmbedBuilder()
      .setColor("Red")
      .setTitle(":x: To many teams found")

    if ( teams.length === 0 ) return await interaction.reply({ embeds: [noMatch] }); // TODO: Better message
    if ( teams === "tooMany" ) return await interaction.reply({ embeds: [toMany] }); // TODO: Better message

    

    await interaction.reply(`:hourglass_flowing_sand: Search for \`${element}\`, \`${role}\` teams`)

    let imgIndex = 0;
    let attachments = [];

    
    for (const team of teams) {
      let canvasWidth = 800;
      let canvasHeight = 450;

      let canvas = createCanvas(canvasWidth, canvasHeight);
      let context = canvas.getContext('2d');

      let i = 0;      

      for (const simulacrum of team) {
        let image = await loadImage(simulacraData[simulacrum].img);

        let elementImg = await loadImage(elements[simulacraData[simulacrum].element])
        let roleImg = await loadImage(roles[simulacraData[simulacrum].role])

        context.drawImage(image, (canvasWidth / 3) * i, 0, canvasWidth / 3, canvasWidth / 3);


        context.fillStyle = 'white';
        context.font = ' 35px Sans Not-Rotated';
        context.textAlign = 'center';
        context.textBaseline = 'top';

        let textY = canvasWidth / 3 + 5;

        context.fillText(simulacraData[simulacrum].name, (canvasWidth / 6) * (2 * i + 1), textY);

        context.drawImage(elementImg, ((canvasWidth / 3) * i) + ((canvasWidth / 3) / 2) - 35 + 50, textY + 50, 70, 70);
        context.drawImage(roleImg, ((canvasWidth / 3) * i) + ((canvasWidth / 3) / 2) - 35 - 50, textY + 50, 70, 70);

        i++;
      }
      
      let buffer = canvas.toBuffer();
      let attachment = new AttachmentBuilder(buffer, 'file.jpg');
      attachment.setName(`${imgIndex}.png`);

      attachments.push(attachment);
      imgIndex++;
    }    


    const embed = new EmbedBuilder()
      .setTitle(`Meta ${role[0].toUpperCase() + role.slice(1)} ${element[0].toUpperCase() + element.slice(1)} Team`)
      .setURL(goToCompLink(teams[0]))
      .setDescription(`Here are the meta ${role[0].toUpperCase() + role.slice(1)} ${element[0].toUpperCase() + element.slice(1)} teams`)
      .setColor(0x00AE86)
      .setImage("attachment://0.png")
      .setFooter({ text: `Page 1/${teams.length}` });
    
    let page = 0

    let buttons = [
      {
        id: 'start',
        emoji: `${arrow['start']}]}`
      },
      {
        id: 'previous',
        emoji: `${arrow['previous']}]}`
      },
      {
        id: 'next',
        emoji: `${arrow['next']}]}`
      },
      {
        id: 'end',
        emoji: `${arrow['end']}]}`
      }
    ];


    const row = new ActionRowBuilder();
    buttons.forEach(button => {
      row.addComponents(
        new ButtonBuilder()
          .setCustomId(button.id)
          .setEmoji(button.emoji)
          .setStyle(1)
          .setDisabled(page === 0 && (button.id === 'start' || button.id === 'previous') || page === teams.length - 1 && (button.id === 'next' || button.id === 'end'))
      );
    });


    buttons.forEach(button => {
      const filter = i => i.customId === button.id && i.message.interaction.id === interaction.id;
      const collector = interaction.channel.createMessageComponentCollector({ filter });
      collector.on('collect', async i => {
        await i.deferUpdate();

        switch (i.customId) {
          case 'start':
            page = 0;
            break;
          case 'next':
            page++;
            break;
          case 'previous':
            page--;
            break;
          case 'end':
            page = teams.length - 1;
            break;
          }

          row.components[0].setDisabled(page === 0);
          row.components[1].setDisabled(page === 0);

          row.components[2].setDisabled(page === teams.length - 1);
          row.components[3].setDisabled(page === teams.length - 1);

          embed.setImage(`attachment://${page}.png`);
          embed.setFooter({ text: `Page ${page + 1}/${teams.length}` });
          embed.setURL(goToCompLink(teams[page]));

          await interaction.editReply({ embeds: [embed], components: [row], files: [attachments[page]] });
      });

      collector.on('end', async collected => {
        console.log(`Collected ${collected.size} items`);
        await interaction.editReply({ components: [] });
      });
    });



    await interaction.editReply({ embeds: [embed], content: "", components: [row], files: [attachments[0]] });


  },
}