require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

require('./routes')(app)

// var MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost/${process.env.MONGO_DB}`
const port = process.env.PORT || 3000

if (port === 3000) {
    var MONGODB_URI = `mongodb://localhost/${process.env.MONGO_DB}`
} else {
    var MONGODB_URI = process.env.MONGODB_URI
}

require('mongoose').connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true })
  .then(_ => app.listen(port, () => console.log(`server running on port ${port}`)))
  .catch(e => console.log(e))
