const mongoose = require('mongoose')

const hashtagSchema = new mongoose.Schema({
    tag: {
        type: String
    },
    count: Number
})

const hashtagModel = new mongoose.model('hashtags', hashtagSchema)
module.exports = { hashtagModel }