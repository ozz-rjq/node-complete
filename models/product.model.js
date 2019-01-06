const sequelize = require('./../util/database.connection');

const Sequelize = require('sequelize');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descripton: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Product;