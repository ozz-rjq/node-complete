const Product = require('../models/product.model');
const Cart = require('../models/cart.model');

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
  Cart.getCart(cart => {
    const cartProducts = [];
    Product.fetchAll(products => {
      for (let product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id == product.id
        );
        if (cartProductData) {
          cartProducts.push({productData: product, qty: cartProductData.qty});
        }
      }
      console.log(cartProducts);
      res.render(
        'shop/cart', 
        {path: '/cart', products: cartProducts}
      );
    });
  });
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