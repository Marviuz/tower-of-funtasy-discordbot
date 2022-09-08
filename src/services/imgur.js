const { default: ImgurClient } = require('imgur');

const imgurClient = new ImgurClient({ clientId: process.env.IMGUR_CLIENT_ID });

const uploadToImgur = async base64Image => {
  const response = await imgurClient.upload({ image: base64Image, type: 'base64' });
  return response.data.link;
};

module.exports = uploadToImgur;