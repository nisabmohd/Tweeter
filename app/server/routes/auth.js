const express = require('express')
const router = express.Router()
var uniqid = require('uniqid');
const { signUpModel } = require('../models/Auth')
const bcrypt = require("bcrypt");

router.post('/login', async (req, res) => {
    try {
        const result = await signUpModel.findOne({ email: req.body.email })
        const validPassword = await bcrypt.compare(req.body.password, result.password);
        if (validPassword)
            res.status(200).send(result)
        else res.status(400).send({ message: "wrong password" });
    } catch (err) {
        if (err) {
            res.status(400).send("User doesn't exist")
        }
    }
})

router.post('/signup', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const createuser = new signUpModel({
            uid: uniqid(),
            email: req.body.email,
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, salt),
            userimg: req.body.userimg ? req.body.userimg : "https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg",
            coverimg: req.body.coverimg || req.body.coverimg !== '' ? req.body.coverimg : "https://goodmorningimagesforlover.com/wp-content/uploads/2018/11/create-facebook-cover-photo-for-whatsapp.jpg",
            bio: req.body.bio ? req.body.bio : ""

        })
        const result = await createuser.save();
        res.status(200).send(result)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

router.put('/edit/:uid', async (req, res) => {
    try {
        if (req.body.password != '') {
            const salt = await bcrypt.genSalt(10);
            const result = await signUpModel.updateOne({ uid: req.params.uid }, { $set: { email: req.body.email, password: await bcrypt.hash(req.body.password, salt), username: req.body.username, userimg: req.body.userimg === '' ? "https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg" : req.body.userimg, coverimg: req.body.coverimg === '' ? "https://goodmorningimagesforlover.com/wp-content/uploads/2018/11/create-facebook-cover-photo-for-whatsapp.jpg" : req.body.coverimg, bio: req.body.bio } })
            const getNewres = await signUpModel.findOne({ uid: req.params.uid })
            return res.status(200).send(getNewres)
        } else {
            const result = await signUpModel.updateOne({ uid: req.params.uid }, { $set: { email: req.body.email, username: req.body.username, email: req.body.email, userimg: req.body.userimg === '' ? "https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg" : req.body.userimg, coverimg: req.body.coverimg === '' ? "https://goodmorningimagesforlover.com/wp-content/uploads/2018/11/create-facebook-cover-photo-for-whatsapp.jpg" : req.body.coverimg, bio: req.body.bio } })
            const getNewres = await signUpModel.findOne({ uid: req.params.uid })
            return res.status(200).send(getNewres)
        }
    } catch (err) {
        res.status(400).send(err)
    }
})


module.exports = router