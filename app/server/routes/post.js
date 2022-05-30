const express = require('express')
const router = express.Router()
const postModel = require('../models/Post')
const { v4: postid } = require('uuid');

//new post
router.post('/newpost', async (req, res) => {
    try {
        const newpost = new postModel({
            uid: req.body.uid,
            post_id: postid(),
            caption: req.body.caption,
            image: req.body.image ? req.body.image : "",
            hashtag: req.body.hashtag && req.body.hashtag.length != 0 ? req.body.hashtag : []
        })
        const res = await newpost.save()
        res.status(200).send({ status: "success" })
    } catch (err) {
        res.status(400).send(err)
    }
})

//all post
router.get('/allpost', async (req, res) => {
    try {
        let arr = []
        const allpost = await postModel.find();
        arr.push(allpost)
        console.log(arr);
        res.send(arr)

    } catch (err) {
        res.status(500).send(err)
    }
})


//specific post
router.get('/:id', async (req, res) => {
    try {
        const post = await postModel.findOne({ post_id: req.params.id });
        res.send(post)

    } catch (err) {
        res.status(500).send(err)
    }
})


//user post
router.get('/:uid', async (req, res) => {
    try {
        const post = await postModel.find({ uid: req.params.uid });
        res.send(post)

    } catch (err) {
        res.status(500).send(err)
    }
})



//delete post
router.delete('/:id', async (req, res) => {
    // try {
    //     const post = await postModel.deleteOne({ post_id: req.params.id });
    //     res.send(post)

    // } catch (err) {
    //     res.status(500).send(err)
    // }
})

//like post



//unlike post



//comment



//retweet


//timeline posts

module.exports = router