const {Schema, model} = require('mongoose');

const gamedailychannelSchema = Schema({
    Guild_id: String,
    Channel_id: String,
    TimeZone: String
})

module.exports = {
    gamedailychannelSchema: model("gamedailychannelSchema", gamedailychannelSchema)
}