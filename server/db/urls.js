const db = require('./connection')
 const Joi = require('joi')
const urls = db.get('urls')

  /*
    {
        url: 'http://example.com'
        name: 'super-catchy'
    }
    */ 

    const schema = Joi.object({
        name: Joi.string().token().min(1).max(100).required()
                .pattern(new RegExp('^[a-zA-Z0-9]$')),
    
        url: Joi.string().uri({
            scheme: [
              
              /https?/
            ]
          }).required()
    }).with('name', 'url')
       
    
 async function create( almostPuny){ const result = Joi.validate(almostPuny, schema);
  // result.error === null
  if (result.error === null) {
    const url = await urls.findOne({
      name: almostPuny.name
    });
    if (!url) {
      return urls.insert(almostPuny);
    } else {
      return Promise.reject({
        isJoi: true,
        details: [{
          message: 'Short name is in use.'
        }]
      });
    }
  } else {
    return Promise.reject(result.error);
  }
 }

 
 module.exports = {
    create
 }