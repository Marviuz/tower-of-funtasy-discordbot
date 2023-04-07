const {Schema, model} = require('mongoose');

const vitalitySchema = Schema({
    id: String,
    timestamp: Number,
    desired: Number
})

module.exports = {
    vitalitySchema: model('vitalitySchema', vitalitySchema)
}