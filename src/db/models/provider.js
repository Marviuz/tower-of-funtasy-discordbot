const { gamedailychannelSchema } = require('../models/schema.game-daily-channel');
const { userSchema } = require('../models/schema.user');
const { schemaVitality, vitalitySchema } = require('./schema.vitality');


//=============================================
//                  USER
//=============================================                             

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

//=============================================
//                  USER
//=============================================

async function getUserTimezone(id) {
    const data = await userSchema.findOne({id: id});
    if (data) return data.TimeZone; else return 0
}

async function editUserTimezone(id, timezone) {
    await userSchema.findOneAndUpdate({id: id}, {TimeZone: timezone});
}

//=============================================
//                  VITALITY
//=============================================

async function setVitalitySchedule() {
    return await vitalitySchema.find({});
}

async function getAllVitality() {
    return await vitalitySchema.find({});
}

module.exports = {
    Channelexist,
    deleteChannel,
    getallChannel,
    getUserTimezone,
    editUserTimezone,
    getAllVitality,
    setVitalitySchedule
}