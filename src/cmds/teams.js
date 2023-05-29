const path = require('path');
const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const teamsData = require('../db/local/teams.json');
const simulacraData = require('../db/local/charInfo.json');
const { createCanvas, loadImage } = require('canvas');

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'Allows giving meta teams according to different characteristics';


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

    const teams = teamsData[element][role];



    let attachments = [];

    for (const team of teams) {


      let canvas = createCanvas(1500, 600);
      let context = canvas.getContext('2d');

      let increment = 0;

      
      for (const simulacrum of team) {
        //console.log(simulacraData[simulacrum].img);

        let image = await loadImage(simulacraData[simulacrum].img);
        context.drawImage(image, increment, 0, 500, 500);
        context.fillText(simulacraData[simulacrum].name, increment, 500 + 50) ;

        increment += 500;
      }



      let buffer = canvas.toBuffer();

      let attachment = new AttachmentBuilder(buffer, 'image.png');

      await interaction.reply({ files: [attachment] });

    }

    
  },
};