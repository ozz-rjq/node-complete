const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop.controller');

router.get('/', shopController.getIndex);

router.get('/products', shopController.getUserProducts);

router.get('/products/:productId', shopController.getProductDetails);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart/delete', shopController.postDeleteCartItem);

router.get('/orders', shopController.getOrders);

router.post('/order-now', shopController.postOrder);

module.exports = router;