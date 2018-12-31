const Product = require('./../models/product');

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

module.exports.getCart = (req, res, next) => {
  res.render(
    'shop/cart', 
    {path: '/cart'}
  );
}

module.exports.getOrders = (req, res, next) => {
  res.render(
    'shop/orders', 
    {path: '/orders'}
  );
}