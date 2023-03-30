const Sequelize = require('sequelize');

const sequelize = new Sequelize('npds', 'root', 'dhaka', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;