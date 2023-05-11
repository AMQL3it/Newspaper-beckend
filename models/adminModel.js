const { DataTypes } = require('sequelize');
const sequelize = require('../databases/config');

const Admin = sequelize.define('Admin', {
    admin_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    admin_name: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true
    },
    admin_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    admin_phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    admin_password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'admins'
  });

module.exports = Admin ;