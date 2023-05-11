const { DataTypes } = require('sequelize');
const sequelize = require('../databases/config');
const Batch = require('./batchModel');

const Student = sequelize.define('Student', {
    std_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    std_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    std_fname: {
        type: DataTypes.STRING,
        trim: true
    },
    std_mname: {
        type: DataTypes.STRING,
        trim: true
    },
    std_dob: {
        type: DataTypes.DATE,
        allowNull: false
    },
    std_bgroup: {
        type: DataTypes.STRING
    },
    std_pst_address: {
        type: DataTypes.TEXT,
        trim: true
    },
    std_pmt_address: {
        type: DataTypes.TEXT,
        trim: true
    },
    std_email: {
      type: DataTypes.STRING,
      unique: true
    },
    std_per_phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    std_gur_phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    std_institute: {
        type: DataTypes.STRING,
        allowNull: false
    },
    std_board: {
        type: DataTypes.STRING
    },
    std_division: {
        type: DataTypes.STRING
    },
    std_roll: {
        type: DataTypes.STRING
    },
    std_reg: {
        type: DataTypes.STRING
    },
  },
  {
    tableName: 'students'
  });

  Student.belongsTo(Batch, { foreignKey: 'bat_id' });

module.exports = Student;