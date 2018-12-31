const express = require('express');
const router = express.Router();

const shopController = require('./../controllers/shop');

router.get('/', shopController.getIndex);

router.get('/products', shopController.getUserProducts);

router.get('/cart', shopController.getCart);

module.exports = router;