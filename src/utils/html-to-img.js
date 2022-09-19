const nodeHtmlToImage = require('node-html-to-image');

const htmlToImg = async (template, data) => {
  const generatedImg = await nodeHtmlToImage({
    html: template,
    content: { data }
  });

  return generatedImg;
};

module.exports = htmlToImg;