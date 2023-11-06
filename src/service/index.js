const express = require('express')
const router = express.Router()
const moment = require('moment')
const blessing = require('../../controllers/blessing')
require('dotenv').config()
router.use((req, res, next) => {
    let { authorization } = req.headers
    if(authorization){
        authorization = authorization.split(" ")[1]
    }
    if (authorization != process.env.KEY) {
        return res.status(401).json({err: "unauthorized"})
    }
    console.log(`DATE TIME: ${moment().format('YYYY-MM-DD h:mm:ss a')}, URL: ${req.originalUrl}`)
    next()
})

router.use('/api/v1/blessing', blessing)

module.exports = router