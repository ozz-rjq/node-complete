const fs = require('fs');
const pathCore = require('path');

const rootDir = require('../util/path');

const path = pathCore.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
  static getCart(cb) {
    fs.readFile(path, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        return cb(null);
      }
      cb(cart);
    })
  }

  static addProduct(id, productPrice) {
    // get content from cart.json file
    fs.readFile(path, (err, fileContent) => {
      // product in the cart is the following object: {id: NUMBER, qty: NUMBER}
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      // check if in the cart exists product with given index
      const existingProductIndex = cart.products.findIndex(p => p.id == id);
      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ... existingProduct };
        updatedProduct.qty++;
        cart.products = [ ... cart.products ];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 }
        cart.products = [ ... cart.products, updatedProduct ];
      }

      // update cart total price
      cart.totalPrice += +productPrice;

      fs.writeFile(path, JSON.stringify(cart), (err) => {
        console.log(err);
      })
    })
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(path, (err, fileContent) => {
      if (err) {
        return;
      }
      let cart = JSON.parse(fileContent);

      const updatedCart = { ... cart };
      const product = updatedCart.products.find(prod => prod.id == id);
      if (!product) {
        return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(prod => prod.id != id);
      updatedCart.totalPrice -= productPrice*productQty;
      fs.writeFile(path, JSON.stringify(updatedCart), err => {
        if (!err) {
          console.log('successs');
        }
      })
    })
  }
}