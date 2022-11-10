const { ActionRowBuilder, ButtonBuilder } = require('discord.js');
const rarities = require('../db/rarities.json');
const { emojis } = require("../utils/app-constants");
const simulacraCN = require("../db/cn/simulacra.cn.json")


const simulacraEmbed = ({ name, rarity, weapon, element, type, baseStats, shatter, charge, effect, advancement, awakening, weaponImg, simulacraImg, chinaOnly }) => {
  
  const actions = (id) => {
    const row = new ActionRowBuilder();
    buttons.forEach(button => {
      row.addComponents(
        new ButtonBuilder()
          .setCustomId(button.id)
          .setStyle(1)
          .setEmoji(button.emoji)
          .setDisabled(id === button.id+"CN" || id === button.id)
      );
    });
  
    return row;
  };
  
  let buttons = [
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
    }
  ];
  
  if (!chinaOnly) { buttons.push({ id: 'cn', label: 'CN', emoji: '<:CN:1035098249687744542>' }) }

  const simulacra = name
  let [CN] = [...simulacraCN].filter(({ name }) => name === simulacra);

  const embed = {
    basicDetails: {
      color: Number(rarities[rarity].replace('#', '0x')),
      title: chinaOnly ? `${emojis.cn} ${name}` : name,
      url: `https://toweroffantasy.info/simulacra/${name.replace(' ', '-').toLowerCase()}`,
      thumbnail: { url: weaponImg },
      fields: [
        { name: 'Weapon', value: weapon, inline: true },
        { name: 'Element', value: `${emojis[element]} ${element.toUpperCase()}`, inline: true },
        { name: 'Type', value: `${emojis[type]} ${type.toUpperCase()}`, inline: true },
        { name: 'Base Stats', value: baseStats.map($ => `${emojis[$]}  ` + $.charAt(0).toUpperCase() + $.slice(1)).join(', ') },
        { name: 'Shatter', value: `${emojis[shatter.rank]} — ${shatter.value.toFixed(2)}`, inline: true },
        { name: 'Charge', value: `${emojis[charge.rank]} — ${charge.value.toFixed(2)}`, inline: true },
      ],
      image: { url: simulacraImg }
    },
    effect: {
      color: Number(rarities[rarity].replace('#', '0x')),
      title: chinaOnly ? `${emojis.cn} ${name}` : name,
      fields: effect.map($ => ({ name: $.title, value: $.description })),
      image: { url: simulacraImg }
    },
    advancement: {
      color: Number(rarities[rarity].replace('#', '0x')),
      title: chinaOnly ? `${emojis.cn} ${name}` : name,
      thumbnail: { url: weaponImg },
      fields: advancement.map(($, i) => ({ name: `${i + 1} ⭐`, value: $ })),
      image: { url: simulacraImg }
    },
    awakening: {
      color: Number(rarities[rarity].replace('#', '0x')),
      title: chinaOnly ? `${emojis.cn} ${name}` : name,
      thumbnail: { url: weaponImg },
      fields: [
        { name: 1200, value: awakening['1200'] },
        { name: 4000, value: awakening['4000'] },
      ],
      image: { url: simulacraImg }
    },

    //=======================================================================================
    //                                    CN EMBED                                          =
    //=======================================================================================

    basicDetailsCN: {
      color: Number(rarities[rarity].replace('#', '0x')),
      title: chinaOnly ? `${emojis.cn} ${name}` : name,
      url: `https://toweroffantasy.info/simulacra/${name.replace(' ', '-').toLowerCase()}`,
      thumbnail: { url: weaponImg },
      fields: [
        { name: 'Weapon', value: weapon, inline: true },
        { name: 'Element', value: `${emojis[element]} ${element.toUpperCase()}`, inline: true },
        { name: 'Type', value: `${emojis[type]} ${type.toUpperCase()}`, inline: true },
        { name: 'Base Stats', value: CN.baseStats.map($ => `${emojis[$]}  ` + $.charAt(0).toUpperCase() + $.slice(1)).join(', ') },
        { name: 'Shatter', value: `${emojis[CN.shatter.rank]} — ${CN.shatter.value.toFixed(2)}`, inline: true },
        { name: 'Charge', value: `${emojis[CN.charge.rank]} — ${CN.charge.value.toFixed(2)}`, inline: true },
      ],
      image: { url: simulacraImg }
    },
    effectCN: {
      color: Number(rarities[CN.rarity].replace('#', '0x')),
      title: chinaOnly ? `${emojis.cn} ${name}` : name,
      fields: CN.effect.map($ => ({ name: $.title, value: $.description })),
      image: { url: simulacraImg }
    },
    advancementCN: {
      color: Number(rarities[CN.rarity].replace('#', '0x')),
      title: chinaOnly ? `${emojis.cn} ${name}` : name,
      thumbnail: { url: weaponImg },
      fields: CN.advancement.map(($, i) => ({ name: `${i + 1} ⭐`, value: $ })),
      image: { url: simulacraImg }
    },
    awakeningCN: {
      color: Number(rarities[rarity].replace('#', '0x')),
      title: chinaOnly ? `${emojis.cn} ${name}` : name,
      thumbnail: { url: weaponImg },
      fields: [
        { name: 1200, value: CN.awakening['1200'] },
        { name: 4000, value: CN.awakening['4000'] },
      ],
      image: { url: simulacraImg }
    }
  };

  return { embed, actions, buttons };
};

module.exports = simulacraEmbed;
