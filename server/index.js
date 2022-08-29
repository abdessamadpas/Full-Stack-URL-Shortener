    const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv').config()
const asyncHandler = require('express-async-handler')
const bodyParser= require('body-parser')
const app = express()
const {create} = require('./db/urls')
const {connectDB} = require('./db/connection')

app.use(morgan("tiny"))
app.use(bodyParser.json())

app.use(express.static('./public'))


app.post('/api/puny/',asyncHandler(async(req, res)=>{
   console.log("enter to post router ");
   console.log(req.body);
    try {
        console.log("create enter");
        const url = await create(req.body)
    res.json(url)
    } catch (error) {
        console.log("to error bitch");
        res.status(500) 
        res.json(error)
       
    }
    
}))
connectDB()

const port = process.env.PORT || 1337
app.listen(port ,()=>{
    console.log(`app is listen on ${port}`);
})
 

// handler error middleware
app.use((error, req, res, next)=>{
    if (error.status) {
        res.status(error.status)
    }else{
    res.json({
        message : error.mesage,
        stack : process.env.NODE_ENV === 'productionD' ? '🎂': error.stack
    })}
})