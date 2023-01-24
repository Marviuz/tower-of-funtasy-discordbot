const path = require('path');
const { SlashCommandBuilder } = require('discord.js');
const { emojis } = require('../utils/app-constants');
const { getAllVitality } = require('../db/models/provider');
const { vitalitySchema } = require('../db/models/schema.vitality');
const schedule = require('node-schedule');

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'Calculates the percentage of critical according to the crit and the level';

module.exports = {
    name: NAME,
    description: DESCRIPTION,
    type: 'tof',
    data: new SlashCommandBuilder()
        .setName(NAME)
        .setDescription(DESCRIPTION)
        .addStringOption(option =>
            option.setName('current_vitality')
              .setDescription('Your current level')
              .setRequired(true)
        )
        .addStringOption(option =>
          option.setName('desired_vitality')
            .setDescription('Your current critical')
        ),

    async execute(interaction) {
        const current = interaction.options.getString('current_vitality');
        let desired = interaction.options.getString('desired_vitality');
    
        if(!desired) { desired = 180 }

        const timeMessage = Math.floor(Date.now() / 1000) + ((desired - current) * 480)
        
        /*
        await new vitalitySchema({
          id: interaction.user.id,
          time: timeMessage
        }).save();
        */

        const date = Date.now() + 10 * 1000; // 5 minutes à partir de maintenant

        schedule.scheduleJob(new Date(date), () => {
          interaction.user.send(`${desired}`)
        });

        interaction.reply(emojis["vitality"])
  },
};
