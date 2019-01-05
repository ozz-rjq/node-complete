const Product = require('../models/product.model');
const Cart = require('../models/cart.model');

module.exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([products, fieldData]) => {
      res.render(
        'shop/index', 
        {
          products: products, 
          path: '/'
        }
      );
    })
    .catch(err => console.log(err));
}

module.exports.getUserProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([products, fieldData]) => {
      res.render(
        'shop/index', 
        {
          products: products, 
          path: '/products'
        }
      );
    })
    .catch(err => console.log(err))
}

module.exports.getProductDetails = (req, res, next) => {
  const prodId = req.params.productId;
  Product.getProductById(prodId)
    .then(([products]) => {
      const product = products[0];

      res.render(
        'shop/product-detail', 
        {product: product, path: '/products'}
      );
    })
    .catch(err => console.log(err));
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

module.exports.postDeleteCartItem = (req, res, next) => {
  const productId = req.body.productId;
  Product.fetchAll(products => {
    const product = products.find(p => p.id == productId);
    Cart.deleteProduct(productId, product.price);
    res.redirect('/products');
  })
}

module.exports.getOrders = (req, res, next) => {
  res.render(
    'shop/orders', 
    {path: '/orders'}
  );
}