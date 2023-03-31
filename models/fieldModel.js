const sequelize = require("../databases/config");
const { DataTypes } = require('sequelize');
const Member = require("./memberModel");

const Field = sequelize.define('Field', {
    field_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    field_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    field_address: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },
  {
    tableName: 'fields'
  });
  
  Field.belongsTo(Member, { foreignKey: 'member_id' });

module.exports = Field ;