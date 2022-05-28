const mongoose = require('mongoose')

const signUpSchema = new mongoose.Schema({
    uid: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    userimg: {
        type: String,
        default: "https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg"
    },
    coverimg: {
        type: String,
        default: "https://goodmorningimagesforlover.com/wp-content/uploads/2018/11/create-facebook-cover-photo-for-whatsapp.jpg"
    }
})

const signUpModel = new mongoose.model('user', signUpSchema);


module.exports = { signUpSchema, signUpModel }