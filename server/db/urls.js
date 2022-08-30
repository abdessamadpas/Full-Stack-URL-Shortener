//const db = require('./connection')
 //const Joi = require('joi')
// const urls = db.get('urls')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
require('mongoose-type-url');

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
       
    const schema = new mongoose.Schema({
      name:{
        type : String,
        required: true 
      },
      url:{
      type: String,
      validate: /https/,
      required:true
      }
    },{
      timestamps: true
    })

    const Urls = mongoose.model('new_ urls',schema)

    const find = asyncHandler (async ( almostPuny)=>{
       return Urls.findOne({
        name: almostPuny
      });

     })



    
 const create = asyncHandler (async ( almostPuny)=>{ 
  // result.error === null
    const model = new Urls(almostPuny)
    const error = model.validateSync();

    if(!error){
    const url = await Urls.findOne({
      name: almostPuny.name
    });
    if (!url) {
      const added =  await Urls.create(almostPuny)
      return added ;
   

    } else {
      return Promise.reject({
        isError: true,
        details: [{
          message: 'this script already used.'
        }]
      });
    }
    }else{
      return Promise.reject({
        isError: true,
        details: [{
          message: ' urls validation failed:'
        }]
      });
    }
    
  } )
 

 
 module.exports = {
    create, find
 }