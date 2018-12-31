const products = [];

const Product = require('./../models/product');

module.exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {path: '/admin/add-product'});
}

module.exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
}

module.exports.getAllProducts = (req, res, next) => {
  const products = Product.fetchAll();
  res.render('shop', {products: products, path: '/'});
}