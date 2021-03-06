const Product = require('../models/product.model');

module.exports.getAdminProducts = (req, res, next) => {
  req.user.getProducts()
  .then(products => {
    res.render(
      'admin/products', 
      {
        products: products, 
        path: '/admin/products'
      }
    );
  })
  .catch(err => {
    console.log(err);
  })
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

  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
  .then(resolve => {
    console.log(resolve);
    res.redirect('/admin/products');
  })
  .catch(err => {
    console.log(err);
  });
}

module.exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;

  req.user.getProducts({ where: {
    id: prodId
  }})
    .then(products => {
      const product = products[0];

      res.render(
        'admin/edit-product', 
        {
          path: '/admin/add-product', 
          product: product, 
          editing: true
        }
      );
    })
}

module.exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  Product.findById(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.imageUrl = updatedImageUrl;
      product.price = updatedPrice;
      product.description = updatedDescription;

      return product.save();
    })
    .then(_ => {
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}

module.exports.postDeleteOrder = (req, res, next) => {
  const productId = req.body.productId;

  Product.destroy({
    where: {
      id: productId
    }
  })
    .then(_ => {
      res.redirect('/products');
    })
    .catch(err => console.log(err));
}