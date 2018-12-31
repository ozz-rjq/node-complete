const Product = require('./../models/product');

module.exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll(prods => {
    res.render(
      'admin/products', 
      {products: prods, path: '/admin/products'}
    );
  });
}

module.exports.getAddProduct = (req, res, next) => {
  res.render(
    'admin/add-product', 
    {path: '/admin/add-product'}
  );
}

module.exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
}