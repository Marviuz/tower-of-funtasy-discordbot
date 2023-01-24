const {Schema, model} = require('mongoose');

const vitalitySchema = Schema({
    id: Number,
    timestamp: Number
})

module.exports = {
    vitalitySchema: model('vitalitySchema', vitalitySchema)
}