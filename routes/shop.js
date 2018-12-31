const express = require('express');
const router = express.Router();

const productConrtoller = require('./../controllers/products');

router.get('/', productConrtoller.getAllProducts);

module.exports = router;