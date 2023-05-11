const express = require('express');
const { createAdmin, updateAdmin, deleteAdmin, getAllAdmins, getAdminById } = require('../controllers/adminController');

const { addAdminDataFilter, adminDataFilterHandler, updateAdminDataFilter } = require('../middlewares/admins/adminValidators');
const { studentDataFilterHandler, updateStudentDataFilter, addStudentDataFilter } = require('../middlewares/students/studentValidators');
const { createStudent, updateStudent, deleteStudent, getAllStudents, getStudentById } = require('../controllers/studentController');
const { teacherDataFilterHandler, addTeacherDataFilter, updateTeacherDataFilter } = require('../middlewares/teachers/teacherValidators');
const { createTeacher, updateTeacher, deleteTeacher, getAllTeachers, getTeacherById } = require('../controllers/teacherController');
const { createLecture, updateLecture, deleteLecture, getAllLectures, getLectureById } = require('../controllers/lectureController');
const { createExam, updateExam, deleteExam, getAllExams, getExamById } = require('../controllers/examController');
const { createBatch, updateBatch, deleteBatch, getAllBatches, getBatchById } = require('../controllers/batchController');
const { addLectureDataFilter, lectureDataFilterHandler, updateLectureDataFilter } = require('../middlewares/lectures/lectureValidators');
const { addExamDataFilter, examDataFilterHandler, updateExamDataFilter } = require('../middlewares/exams/examValidators');
const { createClassSchedule, updateClassSchedule, deleteClassSchedule, getAllClassSchedules, getClassScheduleById } = require('../controllers/classScheduleController');
const { createExamSchedule, updateExamSchedule, deleteExamSchedule, getAllExamSchedules, getExamScheduleById } = require('../controllers/examScheduleController');
const { createExamResult, updateExamResult, deleteExamResult, getAllExamResults, getExamResultById } = require('../controllers/examResultController');
const { createTeacherPayment, updateTeacherPayment, deleteTeacherPayment, getAllTeacherPayments, getTeacherPaymentById } = require('../controllers/teacherPaymentController');

const router = express.Router();

// Admin
router.post('/admins', addAdminDataFilter, adminDataFilterHandler, createAdmin);
router.put('/admins/:admin_id', updateAdminDataFilter, adminDataFilterHandler, updateAdmin);
router.delete('/admins/:admin_id', deleteAdmin);
router.get('/admins', getAllAdmins);
router.get('/admins/:admin_id', getAdminById);

// Batch
router.post('/batches', createBatch);
router.put('/batches/:bat_id', updateBatch);
router.delete('/batches/:bat_id', deleteBatch);
router.get('/batches', getAllBatches);
router.get('/batches/:bat_id', getBatchById);

// Lecture
router.post('/lectures', addLectureDataFilter, lectureDataFilterHandler, createLecture);
router.put('/lectures/:lec_id', updateLectureDataFilter, lectureDataFilterHandler, updateLecture);
router.delete('/lectures/:lec_id', deleteLecture);
router.get('/lectures', getAllLectures);
router.get('/lectures/:lec_id', getLectureById);

// Exam
router.post('/exams', addExamDataFilter, examDataFilterHandler, createExam);
router.put('/exams/:exam_id', updateExamDataFilter, examDataFilterHandler, updateExam);
router.delete('/exams/:exam_id', deleteExam);
router.get('/exams', getAllExams);
router.get('/exams/:exam_id', getExamById);

// Student
router.post('/students', addStudentDataFilter, studentDataFilterHandler, createStudent);
router.put('/students/:std_id', updateStudentDataFilter, studentDataFilterHandler, updateStudent);
router.delete('/students/:std_id', deleteStudent);
router.get('/students', getAllStudents);
router.get('/students/:std_id', getStudentById);

// Teacher
router.post('/teachers', addTeacherDataFilter, teacherDataFilterHandler, createTeacher);
router.put('/teachers/:tch_id', updateTeacherDataFilter, teacherDataFilterHandler, updateTeacher);
router.delete('/teachers/:tch_id', deleteTeacher);
router.get('/teachers', getAllTeachers);
router.get('/teachers/:tch_id', getTeacherById);

// Class Schedule
router.post('/class_schedules', createClassSchedule);
router.put('/class_schedules/:cl_schd_id', updateClassSchedule);
router.delete('/class_schedules/:cl_schd_id', deleteClassSchedule);
router.get('/class_schedules', getAllClassSchedules);
router.get('/class_schedules/:cl_schd_id', getClassScheduleById);

// Exam Schedule
router.post('/exam_schedules', createExamSchedule);
router.put('/exam_schedules/:ex_schd_id', updateExamSchedule);
router.delete('/exam_schedules/:ex_schd_id', deleteExamSchedule);
router.get('/exam_schedules', getAllExamSchedules);
router.get('/exam_schedules/:ex_schd_id', getExamScheduleById);

// Exam Result
router.post('/exam_results', createExamResult);
router.put('/exam_results/:ex_res_id', updateExamResult);
router.delete('/exam_results/:ex_res_id', deleteExamResult);
router.get('/exam_results', getAllExamResults);
router.get('/exam_results/:ex_res_id', getExamResultById);

// Teacher Payment
router.post('/teacher_payments', createTeacherPayment);
router.put('/teacher_payments/:tc_pay_id', updateTeacherPayment);
router.delete('/teacher_payments/:tc_pay_id', deleteTeacherPayment);
router.get('/teacher_payments', getAllTeacherPayments);
router.get('/teacher_payments/:tc_pay_id', getTeacherPaymentById);

module.exports = router;