const { DataTypes } = require('sequelize');
const sequelize = require('../databases/config');

const Exam = sequelize.define('Exam', {
    exam_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    exam_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    exam_subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    exam_topics: {
        type: DataTypes.STRING,
        allowNull: false
    },
    exam_mark: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
  },
  {
    tableName: 'exams'
  });

module.exports = Exam;