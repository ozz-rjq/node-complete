const db = require('./../util/database.connection');

const Cart = require('./cart.model');


module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    
  }

  static delete(id) {
    
  }

  static fetchAll() {
    return db.execute('SELECT * FROM product');
  }

  static getProductById(id) {
    
  }
}