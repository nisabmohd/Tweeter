const express = require('express')
const router = express.Router()
const postModel = require('../models/Post')
const { v4: postid } = require('uuid');

router.post('/newpost', async (req, res) => {
    try {
        const newpost = new postModel({
            uid: req.body.uid,
            post_id: postid(),
            caption: req.body.caption
        })
        const res = await newpost.save()
        res.status(200).send({status:"success"})
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports=router