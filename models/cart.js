const fs = require('fs');
const path = require('path');

const rootDir = require('./../util/path');

const p = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // get content from cart.json file
    fs.readFile(p, (err, fileContent) => {
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

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      })
    })
  }
}