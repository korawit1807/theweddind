const createBlessing = require('./createBlessing')
const express = require('express')
const router = express.Router()


router.post('/create', (req, res) => {
    const blessing = new createBlessing()
    blessing.create(req, res);
})

module.exports =  router
