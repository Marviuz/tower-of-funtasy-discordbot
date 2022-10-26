const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

const fileName = 'tof-logo-alt.png';
const attachment = new AttachmentBuilder(`src/assets/${fileName}`); // Might have problems with relative pathing

const dailies = [
  'Daily Bounty',
  'Resin (Interstellar Exploration if they have better rewards)',
  'Gifts',
  'Traning',
  'Weapon upgrade mats (Commisary > Weapon Store)',
  'Daily Supply Box (Store)',
  'Crew Donation',
  'Sign-in',
  'Claim Artificial Island Materials'
].map(_ => `・${_}`).join('\n');

const weeklies = [
  'Booster module & Advancement module (Crystal Dust Store)',
  'Weekly SSR Weapon (Weapon Store)',
  'Black Nucleus, Joint Supply Chip I & Gold (Support Store)',
  'Void Rift',
  'Frontier Clash',
  'Banges Item Vendor (Claude)',
  'Claire\'s Dream Machine',
  'Artifial Island Bosses',
  'Raid'
].map(_ => `・${_}`).join('\n');

const ReminderEmbed = new EmbedBuilder()
  .setColor(0x0099FF)
  .setTitle('ToF Dailies & Weeklies')
  .setDescription('*Note: I might\'ve forgotten to add many things here*')
  .setThumbnail(`attachment://${fileName}`)
  .addFields(
    { name: 'Dailies', value: dailies },
    { name: 'Weeklies', value: weeklies },
  )
  .setTimestamp();

module.exports = { ReminderEmbed, attachment };
