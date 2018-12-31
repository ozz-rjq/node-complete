const fs = require('fs');
const pathCore = require('path');

const rootDir = require('../util/path');
const path = pathCore.join(rootDir, 'data', 'products.json');

// helper-function
const getProductsFromFile = (cb) => {
  fs.readFile(path, (err, fileContent) => {
    if (err) {
      cb([]);
    }

    cb(JSON.parse(fileContent));
  });
}

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      let newFileContent = JSON.stringify(products);

      fs.writeFile(path, newFileContent, err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
}