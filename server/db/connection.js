const monk = require('monk')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const colors = require('colors')

connectionURL = process.env.MONGO_URL

 //const db = monk(connectionURL)


 const connectDB =asyncHandler ( async()=>{
    try {
        const conn = await mongoose.connect(connectionURL)
      //  console.log(`mongo db connected to ${conn.connection.host}`.cyan.underline);
        console.log(`mongo db connect : ${conn.connection.host}`.rainbow.underline);

   } catch (error) {
    console.log(error);
    process.exit(1)
   }
})

 module.exports = {
    connectDB
}