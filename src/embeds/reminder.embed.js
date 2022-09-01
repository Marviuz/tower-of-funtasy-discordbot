const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

const fileName = 'tof-logo-alt.png';
const attachment = new AttachmentBuilder(`src/assets/${fileName}`); // Might have problems with relative pathing

const ReminderEmbed = new EmbedBuilder()
  .setColor(0x0099FF)
  .setTitle('ToF Dailies & Weeklies')
  .setDescription('*Note: I might\'ve forgotten to add many things here*')
  .setThumbnail(`attachment://${fileName}`)
  .addFields(
    { name: 'Dailies', value: '— Daily Bounty\n— Resin (Interstellar Exploration if they have better rewards)\n— Gifts\n— Traning\n— Weapon upgrade mats (Commisary > Weapon Store)\n— Daily Supply Box (Store)\n— Crew Donation\n— Sign-in' },
    { name: 'Weeklies', value: '— Booster module & Advancement module (Crystal Dust Store)\n— Weekly SSR Weapon (Weapon Store)\n— Black Nucleus, Joint Supply Chip I & Gold (Support Store)\n— Void Rift\n— Frontier Clash\n— Banges Item Vendor (Claude)\n— Claire\'s Dream Machine' },
  )
  .setTimestamp();

module.exports = { ReminderEmbed, attachment };