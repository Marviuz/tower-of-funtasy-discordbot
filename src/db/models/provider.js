const { gamedailychannelSchema } = require('../models/schema.game-daily-channel')

async function Channelexist(channel) {
    const data = await gamedailychannelSchema.findOne({ Channel_id: channel.id })
    if (data) return data; else return 0
}

async function deleteChannel(channel) {
    await gamedailychannelSchema.deleteOne({ Channel_id: channel.id })
}

async function getallChannel() {
    return await gamedailychannelSchema.find({})
}


module.exports = {
    Channelexist,
    deleteChannel,
    getallChannel,
}