const path = require('path');
const { SlashCommandBuilder } = require('discord.js');
const nodemailer = require("nodemailer");


const NAME = path.parse(__filename).name;
const DESCRIPTION = 'Warn the staff of a bug found';

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
          user: process.env.REPORT_MAIL,
          pass: process.env.REPORT_MAIL_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.REPORT_MAIL,
        to: process.env.REPORT_MAIL,
        subject: 'A new bug has been reported',
        html: `
            <div style="background: #272626"; border-radius: 15px>
                <h3 style="padding: 10px 0px 0px 10px; color: #fff">Username:</h3>
                <div style="display: flex; background: #404040; width: 250px; border-radius: 10px; margin-left: 10px">
                    <img style="height: 30px; width: 30px; padding: 5px; border-radius: 50%; margin-top: auto; margin-bottom: auto" src="${interaction.user.displayAvatarURL()}">
                    <p style="margin-left: 5px; color: #fff">${interaction.user.tag}</p>
                </div>
                <h3 style="padding: 10px 0px 0px 10px; color: #fff">Guild:</h3>
                <div style="display: flex; background: #404040; width: 250px; border-radius: 10px; margin-left: 10px; align-items: center; ">
                    <img style="height: 30px; width: 30px; padding: 5px; border-radius: 50%; margin-top: auto; margin-bottom: auto" src="${interaction.member.guild.iconURL()}">
                    <p style="margin-left: 5px; color: #fff">${interaction.member.guild.name}</p>
                </div>
                <h3 style="padding: 10px 0px 0px 10px; color: #fff">Description:</h3>
                <p style="padding: 0px 0px 10px 10px; color: #fff">${description}</p>
            </div>           
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
