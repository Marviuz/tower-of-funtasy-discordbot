const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, AttachmentBuilder } = require('discord.js');
const pull = require('../utils/pull');

const gachaTypes = [
  {
    id: 'black-nucleus',
    label: 'Black Nucleus',
    emoji: '⚫'
  },
  {
    id: 'gold-nucleus',
    label: 'Gold Nucleus',
    emoji: '🟡'
  },
  {
    id: 'red-nucleus',
    label: 'Red Nucleus',
    emoji: '🔴'
  },
  {
    id: 'matrix',
    label: 'Matrix',
    emoji: '🟨'
  },
  {
    id: 'limited-matrix',
    label: 'Limited Matrix',
    emoji: '🟥'
  },
];

const embed = async (user, type) => {
  const img = await pull(true, type.id);
  const attachment = new AttachmentBuilder(img, { name: 'pull.png' });

  return {
    pullsEmbed: new EmbedBuilder()
      .setTitle(`${user}'s ${type.label} pulls!`)
      .setImage('attachment://pull.png')
      .setTimestamp(),
    attachment
  };
};

const actions = () => {
  const row = new ActionRowBuilder();

  gachaTypes.forEach(type => {
    row.addComponents(
      new ButtonBuilder()
        .setCustomId(type.id)
        .setStyle(1)
        .setLabel('x10')
        .setEmoji(type.emoji)
        .setDisabled(type.id !== 'black-nucleus') // TODO: create logic for other gacha types and remove this method chain
    );
  });

  return row;
};

const pullsEmbed = {
  embed,
  actions: actions(),
  gachaTypes,
};

module.exports = pullsEmbed;