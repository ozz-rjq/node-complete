const Product = require('../models/product.model');
const Cart = require('../models/cart.model');

module.exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      console.log(products);
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
  Product.findAll()
    .then(products => {
      console.log(products);
      res.render(
        'shop/product-list', 
        {
          products: products, 
          path: '/products'
        }
      );
    })
    .catch(err => console.log(err));
}

module.exports.getProductDetails = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render(
        'shop/product-detail', 
        {
          product: product, 
          path: '/products'
        }
      );
    })
    .catch(err => console.log(err));
}

module.exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(cart => {
      cart.getProducts()
        .then(products => {
          res.render(
            'shop/cart', 
            {
              path: '/cart', 
              products: products
            }
          );
        })
    })
    .catch(err => console.log(err))
}

module.exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  let fetchedCart;
  let newQty = 1;

  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then(products => {
      let product;

      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        let oldQty = product.cartItem.qty;
        newQty = oldQty + 1;
      }

      return Product.findById(productId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { qty: newQty } 
      })
    })
    .then(promise => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err))
}

module.exports.postDeleteCartItem = (req, res, next) => {
  const productId = req.body.productId;

  req.user.getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: productId } } )
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err))
}

module.exports.getOrders = (req, res, next) => {
  res.render(
    'shop/orders', 
    {path: '/orders'}
  );
}