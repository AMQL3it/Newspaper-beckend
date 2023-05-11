const { DataTypes } = require('sequelize');
const sequelize = require('../databases/config');

const Batch = sequelize.define('Batch', {
    bat_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    bat_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    bat_days: {
        type: DataTypes.STRING,
    },
    bat_time: {
        type: DataTypes.TIME
    },
    bat_capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'batches'
  });

module.exports = Batch;