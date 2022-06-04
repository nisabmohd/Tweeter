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


// random user
router.get('/random/:uid', async (req, res) => {
    try {
        const userfound = await userModel.find({followers:{$ne:req.params.uid}})
        let suggestarr=[]
        userfound.map(elem=>{
            if(elem.uid!=req.params.uid){
                suggestarr.push(elem)
            }
        })
        if(suggestarr.length>2){
            return res.send(suggestarr.slice(0,2))
        }
        res.send(suggestarr)
    } catch (err) {
        res.status(400).send(err)
    }
})

// search username
router.get('/search/find', async (req, res) => {
    try {
        const searchRes = await signUpModel.find({ username: req.body.username }, { password: 0 })
        res.send(searchRes);
    } catch (err) {
        res.status(400).send(err)
    }
})

//follow 
router.put('/follow/:uid', async (req, res) => {
    try {
        const result = await signUpModel.updateOne({ uid: req.body.uid }, { $push: { following: req.params.uid } })
        const result1 = await signUpModel.updateOne({ uid: req.params.uid }, { $push: { followers: req.body.uid } })
        res.send([result, result1])
    } catch (err) {
        res.status(400).send(err)
    }
})

//unfollow 
router.put('/unfollow/:uid', async (req, res) => {
    try {
        const result = await signUpModel.updateOne({ uid: req.body.uid }, { $pull: { following: req.params.uid } })
        const result1 = await signUpModel.updateOne({ uid: req.params.uid }, { $pull: { followers: req.body.uid } })
        res.send([result, result1])
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router