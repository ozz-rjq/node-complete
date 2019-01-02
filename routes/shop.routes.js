const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop.controller');

router.get('/', shopController.getIndex);

router.get('/products', shopController.getUserProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart/delete', shopController.postDeleteCartItem);

router.get('/orders', shopController.getOrders);

module.exports = router;