const { DataTypes } = require("sequelize");
const Field = require("./fieldModel");
const sequelize = require("../databases/config");

const Building = sequelize.define('Building', {
    building_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    building_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    building_address: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },
  {
    tableName: 'buildings'
  });
  
Building.belongsTo(Field, { foreignKey: 'field_id' });

module.exports = Building ;