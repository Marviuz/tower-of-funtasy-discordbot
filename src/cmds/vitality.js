const path = require('path');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { emojis, RED } = require('../utils/app-constants');
const { vitalitySchema } = require('../db/models/schema.vitality');
const schedule = require('node-schedule');
const vitalityEmbed = require('../embeds/vitality.embed');

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'Set up a scheduler that informs you when your vitality is filled';

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
      const { getAllVitality, deleteVitalitySchedule } = require('../../src/db/models/provider');
      const current = interaction.options.getString('current_vitality');
      let desired = interaction.options.getString('desired_vitality');
      const vitality = (await getAllVitality()).filter(vitality => vitality.id === interaction.user.id);

      if(!desired) { desired = 360 }

      /* Errors Messages */
      if (isNaN(Number(current))) {
        return interaction.reply({ embeds: [{ color: RED, title: ':x: You must enter a number' }] })
      } else if (current > desired) {
        return interaction.reply({ embeds: [{ color: RED, title: ':x: The desired vitality cannot be lower than your current vitality' }] })
      } else if (current > 360 || current < 0 || desired > 360 || desired < 0) {
        return interaction.reply({ embeds: [{ color: RED, title: ':x: Your vitality and that desired must be contained between 0 and 180' }] })
      } else if (vitality.length > 0) { 
        return interaction.reply({ embeds: [{ color: RED, title: ':x: You already have a vitality timer' }] }) 
      };

      const timeMessage = Math.floor(Date.now() / 1000) + ((desired - current) * 480)

      await new vitalitySchema({
        id: interaction.user.id,
        timestamp: timeMessage,
        desired: desired
      }).save();
              
      const embed = new EmbedBuilder()
          .setColor('Green')
          .setTitle(':white_check_mark: Vitality timer successfully set')
          .setDescription(`
            **Current Vitality:** ${current} ${emojis["vitality"]} 
            **Desired Vitality:** ${desired} ${emojis["vitality"]}

            **A message will be sent to you in:**
              <t:${timeMessage}:R> (<t:${timeMessage}:T>) 
          `)
        

      console.log(new Date(timeMessage * 1000))
      schedule.scheduleJob(new Date(timeMessage * 1000), async () => {
        await interaction.user.send({ content: `<@${interaction.user.id}>`, embeds: [vitalityEmbed(desired)] })
        await deleteVitalitySchedule(interaction.user.id)
      }); 

      interaction.reply({ embeds: [embed] })
  },
};
