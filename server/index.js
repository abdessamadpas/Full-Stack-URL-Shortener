const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv').config()
const asyncHandler = require('express-async-handler')
const bodyParser= require('body-parser')
const app = express()
const {create, find} = require('./db/urls')
const {connectDB} = require('./db/connection')

app.use(morgan("tiny"))
app.use(bodyParser.json())

app.use(express.static('./public'))

app.get('/:name',asyncHandler(async(req, res)=>{
    
    const url = await find(req.params.name)
    if (url) {
        res.redirect(url.url)
    }else{
        res.redirect(`/404.html?name=${req.params.name}`)
    }
  
    url
}))

app.post('/api/puny/',asyncHandler(async(req, res)=>{
    try {
        const url = await create(req.body)
    res.json(url)
    } catch (error) {
        console.log("to error bitch");
        res.status(500) 
        res.json(error)
       
    }
    
}))

// Connected to db

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
        stack : process.env.NODE_ENV === 'productionD' ? '🎂🚀': error.stack
    })}
})