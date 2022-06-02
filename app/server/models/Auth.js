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
        type: String
    },
    coverimg: {
        type: String
    },
    bio:{
        type:String
    },
    saved:{
        type:Array,
        default:[]
    }
})

const signUpModel = new mongoose.model('user', signUpSchema);


module.exports = { signUpSchema, signUpModel }