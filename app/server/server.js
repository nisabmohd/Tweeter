const express = require('express')
const mongoose = require('mongoose')
const authRotes = require('./routes/auth')
const postRoutes = require('./routes/post')
const userRoutes = require('./routes/user')
var cors = require('cors')
const dotenv = require('dotenv').config()

const app = express();
app.use(express.json())
app.use(cors())


mongoose.connect(process.env.mongodb).then(() => {
    console.log("connected");
}).catch(err => {
    console.log(err);
})

app.use('/auth', authRotes)

app.use('/post', postRoutes)

app.use('/user', userRoutes)

app.listen(5000)