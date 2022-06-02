const mongoose = require('mongoose')
const postschema = new mongoose.Schema({
    uid: {
        type: String
    },
    post_id: {
        type: String
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
        type: String
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
    },
    username:{
        type:String
    },
    userimg:{
        type:String
    }
})

const postModel = new mongoose.model('Posts', postschema);
module.exports = postModel