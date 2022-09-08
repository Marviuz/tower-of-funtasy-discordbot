const fs = require('fs');
const path = require('path');
const nodeHtmlToImage = require('node-html-to-image');

const template = fs.readFileSync(path.resolve(__dirname, '../', 'templates', 'gacha.hbs'), 'utf8');

module.exports = async (data) => {
  const generatedImg = await nodeHtmlToImage({
    html: template,
    content: { data }
  });

  return generatedImg;
};