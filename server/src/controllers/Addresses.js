const db = require('../models/index')
const express = require('express')
const addresses = express.Router()
const cors = require('cors')
const Op = db.Sequelize.Op

// import Addresse sequilize model
const limit = 10;
addresses.use(cors())

// GET SUGGESTED ZIP CODES LIMITED TO 10
addresses.get('/zip', function (req, res) {
    console.log('TEST 1')
    return res.send('Received a GET HTTP method');
})

// GET SUGGESTED STREETS & CITIES LIMITED TO 10
addresses.get('/zip/:chars', function (req, res) {
    db.Address.findAll({
        attributes: [
            [db.Sequelize.fn('DISTINCT', db.Sequelize.col('zip')) ,'zip']
        ],
        limit: limit,
        distinct:true,
        where: {
            zip: {
                [Op.startsWith]: req.params.chars
            }
        }
    })
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})

// GET SUGGESTED STREETS LIMITED TO 10
addresses.get('/street', function (req, res) {
    
})

// GET SUGGESTED ZIP CODES & CITIES LIMITED TO 10
addresses.get('/street/:chars', function (req, res) {
    db.Address.findAll({
        attributes: ['street', 'city'],
        limit,
        where: {
            street: {
                [Op.startsWith]: req.params.chars
            }
        }
    })
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})

// GET SUGGESTED CITIES LIMITED TO 10
addresses.get('/city', function (req, res) {

    let whereConditions = {};

    if (req.query.zip) {
        whereConditions.zip = {
            [Op.eq]: req.query.zip
        }
    }

    getCities(whereConditions, res);
})

// GET SUGGESTED CITIES LIMITED TO 10
addresses.get('/city/:chars', function (req, res) {

    // Set where conditions based on provided req parameters
    let whereConditions = { 
        city: {
            [Op.startsWith]: req.params.chars
        }
    };

    if (req.query.zip) {
        whereConditions.zip = {
            [Op.startsWith]: req.query.zip
        }
    }

    getCities(whereConditions, res)
})

function getCities(whereConditions, res) {
    db.Address.findAll({
        attributes: [
            [db.Sequelize.fn('DISTINCT', db.Sequelize.col('city')) ,'city']
        ],
        limit: limit,
        distinct:true,
        where: whereConditions
    })
    .then(result => {
        if (result.length == 1) {
            this.city = result[0].city;
        }
        res.json(result)
    })
    .catch(err => {
        res.send('error: ' + err)
    })
}

module.exports = addresses
