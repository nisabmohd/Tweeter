const express = require('express')
const router = express.Router();
const { signUpModel: userModel, signUpSchema, signUpModel } = require('../models/Auth')

//specific user
router.get('/:uid', async (req, res) => {
    try {
        const result = await userModel.findOne({ uid: req.params.uid }, { password: 0 })
        res.status(200).send(result)
    } catch (err) {
        res.status(400).send(err)
    }
})


//random user
// router.get('/random/:uid', async (req, res) => {
//     try {
//         const userfound = userModel.find()
//     } catch (err) {

//     }
// })

//search username
// router.get('/search', async (req, res) => {
//     try {
//         const searchRes = await signUpModel.find({ username: req.body.username })
//         console.log(searchRes);
//         res.send('dfgdf')
//     } catch (err) {
//         res.status(400).send(err)
//     }
// })

//follow and unfollw

module.exports = router