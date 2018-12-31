const products = [];

module.exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {path: '/admin/add-product'});
}

module.exports.postAddProduct = (req, res, next) => {
  products.push({title: req.body.title});
  res.redirect('/');
}

module.exports.getAllProducts = (req, res, next) => {
  res.render('shop', {products: products, path: '/'});
}