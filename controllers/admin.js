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
  const id = null;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(id, title, imageUrl, price, description);

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

module.exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  const product = new Product(prodId, updatedTitle, updatedImageUrl, updatedPrice, updatedDescription);
  product.save();

  res.redirect('/products');
}