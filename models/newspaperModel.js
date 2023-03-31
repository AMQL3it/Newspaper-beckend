const { DataTypes } = require("sequelize");
const sequelize = require("../databases/config");

const Newspaper = sequelize.define('Newspaper', {
    paper_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    paper_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    unit_price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    sell_price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    paper_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    tableName: 'newspapers'
  });

  
module.exports = Newspaper;