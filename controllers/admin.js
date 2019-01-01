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
    'admin/edit-product', 
    {path: '/admin/add-product', editing: false}
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

module.exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.getProductById(prodId, product => {
    res.render(
      'admin/edit-product', 
      {path: '/admin/add-product', product: product, editing: true}
    );
  })
}