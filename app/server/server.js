const express = require('express')
const mongoose = require('mongoose')
const authRotes=require('./routes/auth')
const postRoutes=require('./routes/post')
// var bcrypt = require('bcryptjs');

const app = express();
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/tweeter').then(() => {
    console.log("connected");
}).catch(err => {
    console.log(err);
})

app.use('/auth',authRotes)

app.use('/post',postRoutes)


app.listen(5000)