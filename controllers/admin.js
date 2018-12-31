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
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title, imageUrl, price, description);

  product.save();
  res.redirect('/');
}