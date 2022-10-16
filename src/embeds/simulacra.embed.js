const { ActionRowBuilder, ButtonBuilder } = require('discord.js');
const rarities = require('../db/rarities.json');

const rank = {
  "B": "<:B_:1031328664614359060>",
  "A": "<:A_:1031328730024521841>",
  "S": "<:S_:1031328509836144690>"
}

const elements = {
  "volt": "<:volt:1031331135281705031>",
  "flame": "<:flame:1031331192559116368>",
  "ice": "<:ice:1031330891424870490>",
  "physical": "<:physical:1031331106471039006>",
  "aberation": "<:aberration:1031331164746686586>"
}

const types = {
  "dps": "<:dps:1031331937291337889>",
  "support": "<:support:1031331878436880385>",
  "defense": "<:defense:1031331902818361444>"
}

const baseStat = {
  "attack": "<:attack:1031341132925386772>",
  "health": "<:health:1031341765866836049>",
  "defense": "<:resistance:1031341792999780413>",
  "crit": "<:crit:1031341776423886879>"
}

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
