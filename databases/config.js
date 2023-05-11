const Sequelize = require('sequelize');

const sequelize = new Sequelize('youth', 'root', 'shahadat', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;