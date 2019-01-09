const Sequelize = require('sequelize');

const sequelize = require('./../util/database.connection');

const User = sequelize.define('user', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING
  },
  email: {
    allowNull: false,
    type: Sequelize.STRING
  }
});

module.exports = User;