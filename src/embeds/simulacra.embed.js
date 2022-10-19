const { ActionRowBuilder, ButtonBuilder } = require('discord.js');
const rarities = require('../db/rarities.json');
const { rank, elements, baseStat, types } = require("../utils/emoji")

const buttons = [
  {
    id: 'basicDetails',
    label: 'Basic Details',
    emoji: '📃'
  },
  {
    id: 'effect',
    label: 'Effects',
    emoji: '✨'
  },
  {
    id: 'advancement',
    label: 'Advancements',
    emoji: '⭐'
  },
  {
    id: 'awakening',
    label: 'Awakening',
    emoji: '🎁'
  },
];

const simulacraEmbed = ({ name, rarity, weapon, element, type, baseStats, shatter, charge, effect, advancement, awakening, weaponImg, simulacraImg }) => {
  const embed = {
    basicDetails: {
      color: Number(rarities[rarity].replace('#', '0x')),
      title: name,
      thumbnail: { url: weaponImg },
      fields: [
        { name: 'Weapon', value: weapon, inline: true },
        { name: 'Element', value: `${elements[element]} ${element.toUpperCase()}`, inline: true },
        { name: 'Type', value: `${types[type]} ${type.toUpperCase()}`, inline: true },
        { name: 'Base Stats', value: baseStats.map($ => `${baseStat[$]}  ` + $.charAt(0).toUpperCase() + $.slice(1)).join(', ') },
        { name: 'Shatter', value: `${rank[shatter.rank]} — ${shatter.value.toFixed(2)}`, inline: true },
        { name: 'Charge', value: `${rank[charge.rank]} — ${charge.value.toFixed(2)}`, inline: true },
      ],
      image: { url: simulacraImg }
    },
    effect: {
      color: Number(rarities[rarity].replace('#', '0x')),
      title: name,
      fields: effect.map($ => ({ name: $.title, value: $.description })),
      image: { url: simulacraImg }
    },
    advancement: {
      color: Number(rarities[rarity].replace('#', '0x')),
      title: name,
      thumbnail: { url: weaponImg },
      fields: advancement.map(($, i) => ({ name: `${i + 1} ⭐`, value: $ })),
      image: { url: simulacraImg }
    },
    awakening: {
      color: Number(rarities[rarity].replace('#', '0x')),
      title: name,
      thumbnail: { url: weaponImg },
      fields: [
        { name: 1200, value: awakening['1200'] },
        { name: 4000, value: awakening['4000'] },
      ],
      image: { url: simulacraImg }
    }
  };

  return { embed, actions, buttons };
};

const actions = (id) => {
  const row = new ActionRowBuilder();

  buttons.forEach(button => {
    row.addComponents(
      new ButtonBuilder()
        .setCustomId(button.id)
        .setStyle(1)
        .setEmoji(button.emoji)
        .setDisabled(id === button.id)
    );
  });

  return row;
};

module.exports = simulacraEmbed;
