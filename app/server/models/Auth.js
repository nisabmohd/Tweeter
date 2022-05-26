const mongoose = require('mongoose')

const signUpSchema = new mongoose.Schema({
    uid: {
        type: String
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
})

const signUpModel = new mongoose.model('user', signUpSchema);


module.exports = { signUpSchema, signUpModel }