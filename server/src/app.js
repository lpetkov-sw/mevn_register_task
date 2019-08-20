var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()

// set port by getting PORT env variable if exists, either use port 5000
var port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

var Users = require('./controllers/Users')
app.use('/users', Users)

var Addresses = require('./controllers/Addresses')
app.use('/addresses', Addresses)

app.listen(port, () => {
  console.log('Server is running on port: ' + port)
})
