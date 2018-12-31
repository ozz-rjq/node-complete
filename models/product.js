const fs = require('fs');
const pathCore = require('path');

const rootDir = require('../util/path');
const path = pathCore.join(rootDir, 'data', 'products.json');

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    fs.readFile(path, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }

      products.push(this);
      let newFileContent = JSON.stringify(products);

      fs.writeFile(path, newFileContent, err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cd) {
    fs.readFile(path, (err, fileContent) => {
      if (err) {
        cb([]);
      }

      cb(JSON.parse(fileContent));
    });
  }
}