const Admin = require("../models/adminModel");
const Batch = require("../models/batchModel");
const Class_Schedule = require("../models/classScheduleModel");
const Exam = require("../models/examModel");
const Exam_Result = require("../models/examResultModel");
const Exam_Schedule = require("../models/examScheduleModel");
const Lecture = require("../models/lectureModel");
const Student = require("../models/studentModel");
const Teacher = require("../models/teacherModel");
const Teacher_Payment = require("../models/teacherPaymentModel");
const sequelize = require("./config");

exports.connectToDatabase = async () => {
    try {
      await sequelize.authenticate();
      console.log('Youth Academy DB connection successfully.');
      return sequelize; 
    } catch (error) {
      console.error('Unable to connect to the database:',error);
      throw error; 
    }
};

const Models = {
  'admins': Admin,
  'batches': Batch,
  'students': Student,
  'teachers': Teacher,
  'lectures': Lecture,
  'exams': Exam,
  'class_schedules': Class_Schedule,
  'exam_schedules': Exam_Schedule,
  'exam_results': Exam_Result,
  'teacher_payments': Teacher_Payment
};

// { alter: true }
exports.modelsAutoLoader = async () => {
    try {
      for (const modelName in Models) {
        await Models[modelName].sync();
        console.log(`${modelName} table created successfully.`);
      }
    } catch (error) {
      console.error('Unable to create tables:', error);
      throw error; 
    }
}
