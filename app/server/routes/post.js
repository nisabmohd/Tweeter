const express = require('express')
const router = express.Router()
const postModel = require('../models/Post')
const { v4: postid } = require('uuid');
const {signUpModel}=require('../models/Auth')
//new post
router.post('/newpost', async (req, res) => {
    try {
        const getUser=await signUpModel.findOne({uid:req.body.uid})
        const newpost = new postModel({
            uid: req.body.uid,
            post_id: postid(),
            caption: req.body.caption,
            image: req.body.image ? req.body.image : "",
            hashtag: req.body.hashtag && req.body.hashtag.length != 0 ? req.body.hashtag : [],
            userimg:getUser.userimg,
            username:getUser.username
        })
        const result = await newpost.save()
        res.status(200).send({ status: "success" })
    } catch (err) {
        res.status(500).send(err)
    }
})

//all post
router.get('/allpost', async (req, res) => {
    try {
        const allpost = await postModel.find().sort({timestamp: -1});
        res.send(allpost)

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
router.get('/up/:uid', async (req, res) => {
    try {
        const post = await postModel.find({ uid: req.params.uid }).sort({timestamp: -1});
        console.log(post);
        res.status(200).send(post)

    } catch (err) {
        res.status(500).send(err)
    }
})



//delete post
router.delete('/:id', async (req, res) => {
    try {
        const postDetails=await postModel.findOne({post_id:req.params.id})
        if(!postDetails){
            return res.status(400).send({status:"Post not found"})
        }
        const userDetails=await signUpModel.findOne({uid:req.body.uid})
        if(postDetails.uid==userDetails.uid){
            const post = await postModel.deleteOne({ post_id: req.params.id });
        }
        res.send({status:"deleted"})

    } catch (err) {
        res.status(400).send({status:"You are not authorised to delete the post"})
    }
})

//like post



//unlike post



//comment



//retweet


//timeline posts

module.exports = router