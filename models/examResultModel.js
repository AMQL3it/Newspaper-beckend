const { DataTypes } = require('sequelize');
const sequelize = require('../databases/config');
const Student = require('./studentModel');
const Exam_Schedule = require('./examScheduleModel');

const Exam_Result = sequelize.define('Exam_Result', {
    ex_res_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ex_res_mark: {
        type: DataTypes.DATE,
        allowNull: false
    },
    ex_res_notify: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
  },
  {
    tableName: 'exam_results'
  });

  Exam_Result.belongsTo(Student, { foreignKey: 'std_id' });
  Exam_Result.belongsTo(Exam_Schedule, { foreignKey: 'ex_schd_id' });

module.exports = Exam_Result;