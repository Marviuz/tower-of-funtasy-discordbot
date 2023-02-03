const path = require('path');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { emojis, RED } = require('../utils/app-constants');
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
              .setDescription('Your current Vitality')
              .setRequired(true)
        )
        .addStringOption(option =>
          option.setName('desired_vitality')
            .setDescription('The number of Vitality you want')
        ),

    async execute(interaction) {
      const current = interaction.options.getString('current_vitality');
      let desired = interaction.options.getString('desired_vitality');

      if(!desired) { desired = 180 }

      /* Errors Messages */
      if (isNaN(Number(current))) {
        return interaction.reply({ embeds: [{ color: RED, title: ':x: You must enter a number' }] })
      } else if (current > desired) {
        return interaction.reply({ embeds: [{ color: RED, title: ':x: The desired vitality cannot be lower than your current vitality' }] })
      } else if (current > 180 || current < 0 || desired > 180 || desired < 0) {
        return interaction.reply({ embeds: [{ color: RED, title: ':x: Your vitality and that desired must be contained between 0 and 180' }] })
      }

        const timeMessage = Math.floor(Date.now() / 1000) + ((desired - current) * 480)
        
        /*
        await new vitalitySchema({
          id: interaction.user.id,
          time: timeMessage
        }).save();
        */        

        const date = Date.now() + 10 * 1000; // 5 minutes à partir de maintenant

        const embed = new EmbedBuilder()
            .setColor('Green')
            .setTitle(':white_check_mark: Vitality timer successfully set')
            .setDescription(`
              **Current Vitality:** ${current} ${emojis["vitality"]} 
              **Desired Vitality:** ${desired} ${emojis["vitality"]}

              **A message will be sent to you in:**
                <t:${Math.round(date / 1000)}:R> (<t:${Math.round(date / 1000)}:T>) 
            `)
            

        schedule.scheduleJob(new Date(date), () => {
          interaction.user.send(`${desired}`)
        });

        interaction.reply({ embeds: [embed] })
  },
};
