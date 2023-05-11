const { DataTypes } = require('sequelize');
const sequelize = require('../databases/config');

const Lecture = sequelize.define('Lecture', {
    lec_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    lec_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lec_subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lec_topics: {
        type: DataTypes.STRING,
        allowNull: false
    }
  },
  {
    tableName: 'lectures'
  });

module.exports = Lecture;