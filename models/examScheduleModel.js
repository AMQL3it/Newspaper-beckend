const { DataTypes } = require('sequelize');
const sequelize = require('../databases/config');
const Batch = require('./batchModel');
const Exam = require('./examModel');

const Exam_Schedule = sequelize.define('Exam_Schedule', {
    ex_schd_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ex_schd_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    ex_schd_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    ex_schd_notify: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
  },
  {
    tableName: 'exam_schedules'
  });

  Exam_Schedule.belongsTo(Exam, { foreignKey: 'exam_id' });
  Exam_Schedule.belongsTo(Batch, { foreignKey: 'bat_id' });


module.exports = Exam_Schedule;