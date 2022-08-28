const monk = require('monk')

connectionURL = process.env.MONGO_URL

 const db = monk(connectionURL)

 module.exports = db