const { DataTypes } = require('sequelize');
const sequelize = require('../databases/config');

const Teacher = sequelize.define('Teacher', {
    tch_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tch_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tch_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    tch_phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    tch_institute: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tch_department: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tch_subject: {
        type: DataTypes.STRING
    },
  },
  {
    tableName: 'teachers'
  });

module.exports = Teacher;