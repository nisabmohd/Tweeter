const express = require('express')
const { signUpModel } = require('./models/Auth')
const mongoose = require('mongoose')
const { v4: uid } = require('uuid');
// var bcrypt = require('bcryptjs');

const app = express();
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/tweeter').then(() => {
    console.log("connected");
}).catch(err => {
    console.log(err);
})

app.get('/test', (req, res) => {
    res.send("sdhskldf")
})

app.post('/auth/signup', async (req, res) => {
    try {
        const createuser = new signUpModel({
            uid: uid(),
            username: req.body.username,
            password: req.body.password
        })
        const result = await createuser.save();
        res.send({uid:result.uid})
    }
    catch (err) {
        res.status(400).send(err)
    }
})

app.post('/auth/login', async (req, res) => {
    try{
        const result=await signUpModel.find({"username":req.body.username,"password":req.body.password})
        res.send({uid:result[0].uid})
    }catch(err){
        if(err){
            res.status(400).send("User doesn't exist")
        }
    }
})

app.listen(5000)