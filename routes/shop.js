const express = require('express');
const path = require('path');

const rootDir = require('./../util/path');

const router = express.Router();

const products = require('./admin').products;

router.get('/', (req, res, next) => {
  res.render('shop', {products: products});
});

module.exports = router;