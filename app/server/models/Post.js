const mongoose = require('mongoose')
const postschema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    post_id: {
        type: String,
        unique: true,
        required: true
    },
    likes: {
        type: Array,
        default: [],
    },
    comments: {
        type: Array,
        default: []
    },
    retweet: {
        type: Array,
        default: []
    },
    caption: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    hashtag: {
        type: Array,
        default: []
    }
})

const postModel = new mongoose.model('Posts', postschema);
module.exports = postModel