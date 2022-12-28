const path = require('path');
const { SlashCommandBuilder } = require('discord.js');
const nodemailer = require("nodemailer");


const NAME = path.parse(__filename).name;
const DESCRIPTION = 'Get all interactive maps links';

module.exports = {
  name: NAME,
  description: DESCRIPTION,
  type: 'tof',
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription(DESCRIPTION)
    .addStringOption(option =>
      option.setName('description')
        .setDescription('Bug description')
        .setRequired(true)
    ),
  async execute(interaction) {
    const description = await interaction.options.getString('description');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '',
            pass: ''
        }
    })

    const mailOptions = {
        from: 'tofun.discordbot.report@gmail.com',
        to: 'tofun.discordbot.report@gmail.com',
        subject: 'Sending Email using Node.js',
        html: `
            <p><strong>Username:</strong> {username}</p>
            <p><strong>Server:</strong> {server}</p>
            <p><strong>Description:</strong></p>
            <p>oeeeee</p>
            
        `
    };


      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    await interaction.reply(description);
  },
};
