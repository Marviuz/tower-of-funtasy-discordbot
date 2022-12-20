const { gamedailychannelSchema } = require('../models/schema.game-daily-channel')
const { userSchema } = require('../models/schema.user')

/*
  _____ _                            _ 
 / ____| |                          | |
| |    | |__   __ _ _ __  _ __   ___| |
| |    | '_ \ / _` | '_ \| '_ \ / _ \ |
| |____| | | | (_| | | | | | | |  __/ |
 \_____|_| |_|\__,_|_| |_|_| |_|\___|_|                                     
*/                                

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

/*
 _    _               
| |  | |              
| |  | |___  ___ _ __ 
| |  | / __|/ _ \ '__|
| |__| \__ \  __/ |   
 \____/|___/\___|_|   
*/                   
               

async function getUserTimezone(id) {
    const data = await userSchema.findOne({id: id});
    if (data) return data.TimeZone; else return 0
}

async function editUserTimezone(id, timezone) {
    await userSchema.findOneAndUpdate({id: id}, {TimeZone: timezone});
}

module.exports = {
    Channelexist,
    deleteChannel,
    getallChannel,
    getUserTimezone,
    editUserTimezone
}