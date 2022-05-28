const express = require('express')
const router = express.Router()
var uniqid = require('uniqid');
const { signUpModel } = require('../models/Auth')

router.post('/login', async (req, res) => {
    try {
        const result = await signUpModel.find({ "username": req.body.username, "password": req.body.password })
        res.status(200).send({ uid: result[0].uid })
    } catch (err) {
        if (err) {
            res.status(400).send("User doesn't exist")
        }
    }
})

router.post('/signup', async (req, res) => {
    try {
        const createuser = new signUpModel({
            uid: uniqid(),
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            userimg: req.body.userimg ? req.body.userimg : "https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg",
            coverimg: req.body.coverimg ? req.body.coverimg : "https://goodmorningimagesforlover.com/wp-content/uploads/2018/11/create-facebook-cover-photo-for-whatsapp.jpg"

        })
        const result = await createuser.save();
        res.status(200).send({ uid: result.uid })
    }
    catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router