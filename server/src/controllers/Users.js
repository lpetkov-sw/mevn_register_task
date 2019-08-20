const db = require('../models/index')
const express = require('express')
const users = express.Router()
const cors = require('cors')

// import User sequilize model
const User = require('../models/User')
users.use(cors())

// Simple Registration API endpoint
users.post('/register', function (req, res) {
    const userData = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        zipcode: req.body.zip,
        city: req.body.city,
        street: req.body.street,
        streetNo: req.body.street_no,
        email: req.body.email
    }

    db.User.findOne({
        where: {
        email: req.body.email
        }
    })
    .then(user => {
    if (!user) {
        db.User.create(userData).then(user => {
            res.json({ status: user.email + 'Registered!' })
        })
        .catch(err => {
        res.send('error: ' + err)
        })
    } else {
        res.json({ error: 'User already exists' })
    }
    })
    .catch(err => {
    res.send('error: ' + err)
    })
})

module.exports = users
