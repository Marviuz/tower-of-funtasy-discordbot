const {Schema, model} = require('mongoose');

const userSchema = Schema({
    id: Number,
    TimeZone: String
})

module.exports = {
    userSchema: model('userSchema', userSchema)
}