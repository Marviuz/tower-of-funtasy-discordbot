const { ButtonBuilder, ActionRowBuilder } = require('discord.js');
const rarities = require('../db/local/matrices.json');
const { emojis } = require('../utils/app-constants');
const matricesCN = require('../db/local/cn/matrices.cn.json');

const matrixEmbed = ({ matrixImg, matrixId, name, rarity, two, three, four, chinaOnly }) => {

  let button = { id: 'cn', label: 'CN', emoji: '<:CN:1035098249687744542>' }
  const action = () => {
    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(button.id)
        .setStyle(1)
        .setEmoji(button.emoji)
    );
  
    return row
  }

  let piece = rarity === 'SSR' ?
    ([{ name: '2-piece set', value: two }, { name: '4-piece set', value: four }]) :
    ([{ name: '3-piece set', value: three }]);

  const matrix = name
  let [CN] = [...matricesCN].filter(({ name }) => name === matrix);  

  let pieceCN = CN.rarity === 'SSR' ?
    ([{ name: '2-piece set', value: CN.two }, { name: '4-piece set', value: CN.four }]) :
    ([{ name: '3-piece set', value: CN.three }]);
        
  const embed = {
    matrix: {
      color: Number(rarities[CN.rarity].replace('#', '0x')),
      title: chinaOnly ? `${emojis.cn} ${name}` : name,
      url: `https://toweroffantasy.info/matrices/${name.replace(' ', '-').toLowerCase()}`,
      thumbnail: { url: matrixImg },
      fields: piece
    },
    matrixCN: {
      color: Number(rarities[rarity].replace('#', '0x')),
      title: chinaOnly ? `${emojis.cn} ${name}` : name,
      url: `https://toweroffantasy.info/matrices/${name.replace(' ', '-').toLowerCase()}`,
      thumbnail: { url: matrixImg },
      fields: pieceCN
    }
  }

  if (chinaOnly) { button.id = "chinaOnly"; }
  return { embed, action, button };
};


module.exports = matrixEmbed;
