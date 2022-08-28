const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv').config()
const asyncHandler = require('express-async-handler')
const bodyParser= require('body-parser')
const app = express()
const urls = require('./db/urls')


app.use(morgan("tiny"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false,}));
app.use(express.static('./public'))


app.post('/api/puny/',asyncHandler(async(req, res)=>{
   console.log("enter to post router ");
    try {
        const url = await urls.create(req.body)
    res.json(url)
    } catch (error) {
        res.status(500).json("error catch  ss",error)
       
    }
    
}))


const port = process.env.PORT || 1337
app.listen(port ,()=>{
    console.log(`app is listen on ${port}`);
})