const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'кщще', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;