const { DataTypes } = require("sequelize");
const sequelize = require("../databases/config");
const Building = require("./buildingModel");

const Room = sequelize.define('Room', {
    room_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    room_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    room_name: {
        type: DataTypes.STRING,
    },
    room_phone: {
        type: DataTypes.STRING,
    },
    room_designation: {
        type: DataTypes.STRING
    },
    newspapers: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
            return JSON.parse(this.getDataValue('newspapers'));
        },
        set(value) {
            this.setDataValue('newspapers', JSON.stringify(value));
        }
    }
},
{
    tableName: 'rooms'
});
  
Room.belongsTo(Building, { foreignKey: 'building_id' });

module.exports = Room;