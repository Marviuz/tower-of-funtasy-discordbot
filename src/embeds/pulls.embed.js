const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, AttachmentBuilder } = require('discord.js');
const pull = require('../utils/pull');

const gachaTypes = [
  {
    id: 'black-nucleus',
    label: 'Black Nucleus',
    emoji: '⚫',
    disabled: false
  },
  {
    id: 'gold-nucleus',
    label: 'Gold Nucleus',
    emoji: '🟡',
    disabled: true
  },
  {
    id: 'red-nucleus',
    label: 'Red Nucleus',
    emoji: '🔴',
    disabled: true
  },
  {
    id: 'matrix',
    label: 'Matrix',
    emoji: '🟨',
    disabled: true
  },
  {
    id: 'limited-matrix',
    label: 'Limited Matrix',
    emoji: '🟥',
    disabled: true
  },
];

const embed = async (user, type) => {
  const { pulls, img, pity } = await pull(true, type.id, user);
  const attachment = new AttachmentBuilder(img, { name: 'pull.png' });

  return {
    pullsEmbed: new EmbedBuilder()
      .setTitle(`${user.username}'s ${type.label} pulls!`)
      .setImage('attachment://pull.png')
      .setTimestamp()
      .setFooter({ text: 'Artwork by Ao#9968' }),
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
        .setDisabled(type.disabled) // TODO: create logic for other gacha types and remove this method chain
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
