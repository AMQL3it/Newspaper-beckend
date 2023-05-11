const { DataTypes } = require('sequelize');
const sequelize = require('../databases/config');
const Lecture = require('./lectureModel');
const Batch = require('./batchModel');
const Teacher = require('./teacherModel');

const Class_Schedule = sequelize.define('Class_Schedule', {
    cl_schd_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    cl_schd_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    cl_schd_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    cl_schd_notify: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  },
  {
    tableName: 'class_schedules'
  });

  Class_Schedule.belongsTo(Lecture, { foreignKey: 'lec_id' });
  Class_Schedule.belongsTo(Batch, { foreignKey: 'bat_id' });
  Class_Schedule.belongsTo(Teacher, { foreignKey: 'tch_id' });

module.exports = Class_Schedule;