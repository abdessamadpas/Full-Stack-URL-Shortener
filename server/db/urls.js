//const db = require('./connection')
 //const Joi = require('joi')
// const urls = db.get('urls')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')


  /*
    {
        url: 'http://example.com'
        name: 'Abdopas'
    }
    */ 
    // const schema = Joi.object({
    //     name: Joi.string().token().min(1).max(100).required()
    //             .pattern(new RegExp('^[a-zA-Z0-9]$')),
    
    //     url: Joi.string().uri({
    //         scheme: [
    //           /https?/
    //         ]
    //       }).required()
    // }).with('name', 'url')
       
    const schema = mongoose.Schema({
      name:{
        type : String,
        required: true 
      },
      url:{
        type : String,
        required: true 
      }
    },{
      timestamps: true
    })

    const Urls = mongoose.model('wewep',schema)
    
 const create = asyncHandler (async ( almostPuny)=>{ 
  console.log("create functio work");
  // result.error === null

    const url = await Urls.findOne({
      name: almostPuny.name
    });
    console.log("URL check ::::: ", url);
    if (!url) {
     const added =  await Urls.create(almostPuny)
     console.log(added);
      return added ;
    } else {
      return Promise.reject({
        isJoi: true,
        details: [{
          message: 'Short name is in use.'
        }]
      });
    }
  } )
 

 
 module.exports = {
    create
 }