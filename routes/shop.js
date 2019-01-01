const express = require('express');
const router = express.Router();

const shopController = require('./../controllers/shop');

router.get('/', shopController.getIndex);

router.get('/products', shopController.getUserProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.get('/orders', shopController.getOrders);

module.exports = router;