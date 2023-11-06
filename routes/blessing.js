const express = require('express');
const route = express.Router();

const blessing = require('../controllers/blessingController');

route.get('/', blessing.index);
route.post('/store', blessing.store);

module.exports = route;