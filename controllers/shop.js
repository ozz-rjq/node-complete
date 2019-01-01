const Product = require('./../models/product');
const Cart = require('./../models/cart');

module.exports.getIndex = (req, res, next) => {
  Product.fetchAll(prods => {
    res.render(
      'shop/index', 
      {products: prods, path: '/'}
    );
  });
}

module.exports.getUserProducts = (req, res, next) => {
  Product.fetchAll(prods => {
    res.render(
      'shop/product-list', 
      {products: prods, path: '/products'}
    );
  });
}

module.exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.getProductById(prodId, product => {
    res.render(
      'shop/product-detail', 
      {product: product, path: '/products'}
    );
  });
}

module.exports.getCart = (req, res, next) => {
  res.render(
    'shop/cart', 
    {path: '/cart'}
  );
}

module.exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.getProductById(productId, product => {
    Cart.addProduct(productId, product.price);
  });
  res.redirect('/cart');
}

module.exports.getOrders = (req, res, next) => {
  res.render(
    'shop/orders', 
    {path: '/orders'}
  );
}