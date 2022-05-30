const express = require('express')
const router = express.Router();
const {signUpModel:userModel} = require('../models/Auth')


router.get('/:uid', async (req, res) => {
    try {
        const result = await userModel.findOne({ uid: req.params.uid },{password:0})
        res.status(200).send(result)
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router