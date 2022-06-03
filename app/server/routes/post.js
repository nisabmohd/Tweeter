const express = require('express')
const router = express.Router()
const postModel = require('../models/Post')
const { v4: postid } = require('uuid');
const { signUpModel } = require('../models/Auth')
//new post
router.post('/newpost', async (req, res) => {
    try {
        const getUser = await signUpModel.findOne({ uid: req.body.uid })
        const newpost = new postModel({
            uid: req.body.uid,
            post_id: postid(),
            caption: req.body.caption,
            image: req.body.image ? req.body.image : "",
            hashtag: req.body.hashtag && req.body.hashtag.length != 0 ? req.body.hashtag : [],
            userimg: getUser.userimg,
            username: getUser.username
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
        const allpost = await postModel.find().sort({ timestamp: -1 });
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
        const post = await postModel.find({ uid: req.params.uid }).sort({ timestamp: 0 });
        res.status(200).send(post)

    } catch (err) {
        res.status(500).send(err)
    }
})



//delete post
router.delete('/:id', async (req, res) => {
    try {
        const postDetails = await postModel.findOne({ post_id: req.params.id })
        if (!postDetails) {
            return res.status(400).send({ status: "Post not found" })
        }
        if (postDetails.uid == req.body.uid) {
            const post = await postModel.deleteOne({ post_id: req.params.id });
            return res.send({ status: "deleted" })
        }
        else {
            return res.status(401).send({ status: "You are not authorised to delete the post" })
        }
    } catch (err) {
        res.status(401).send(err)
    }
})


//post of a hastag
router.get('/hashtag/:hashtag', async (req, res) => {
    try {
        const data = await postModel.find({ hashtag: req.params.hashtag })
        console.log(data);
        res.send("sdfsfdgdfgddf")
    } catch (err) {
        res.status(400).send("sdfsdf")
    }
})

//like post
router.put('/like/:postid', async (req, res) => {
    try {
        const result=await postModel.updateOne({ post_id: req.params.postid },{$push:{likes:req.body.uid}})
        res.send(result)
    } catch (err) {
        res.status(400).send(err)
    }
})


//unlike post
router.put('/unlike/:postid', async (req, res) => {
    try {
        const result=await postModel.updateOne({ post_id: req.params.postid },{$pull:{likes:req.body.uid}})
        res.send(result)
    } catch (err) {
        res.status(400).send(err)
    }
})


//comment
router.put('/comment/:postid', async (req, res) => {
    try {
        const result=await postModel.updateOne({ post_id: req.params.postid },{$push:{comments:{uid:req.body.uid,comment:req.body.comment}}})
        res.send(result)
    } catch (err) {
        res.status(400).send(err)
    }
})


//retweet
router.put('/retweet/:postid', async (req, res) => {
    try {
        const result=await postModel.updateOne({ post_id: req.params.postid },{$push:{retweet:req.body.uid}})
        res.send(result)
    } catch (err) {
        res.status(400).send(err)
    }
})


//save apost in user


//get saved post of user
router.get('/saved/:uid',async(req,res)=>{
    try{
        const getAllSaveduid=await signUpModel.findOne({uid:req.params.uid})
        const allsavedpost=[]
        getAllSaveduid.saved.map(async(item)=>{
            const temppost=await postModel.findOne({post_id:item})
            allsavedpost.push(temppost);
        })
        res.send(allsavedpost)
    }catch(err){
        res.status(400).send(err)
    }
})

//timeline posts



module.exports = router