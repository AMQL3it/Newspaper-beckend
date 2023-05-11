const { DataTypes } = require('sequelize');
const sequelize = require('../databases/config');
const Teacher = require('./teacherModel');
const Class_Schedule = require('./classScheduleModel');

const Teacher_Payment = sequelize.define('Teacher_Payment', {
    tc_pay_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tc_pay_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
  },
  {
    tableName: 'teacher_payments'
  });

  Teacher_Payment.belongsTo(Teacher, { foreignKey: 'tch_id' });
  Teacher_Payment.belongsTo(Class_Schedule, { foreignKey: 'cl_schd_id' });

module.exports = Teacher_Payment;