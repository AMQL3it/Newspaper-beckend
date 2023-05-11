const { check, validationResult } = require("express-validator");
const createError = require('http-errors');
const Exam = require("../../models/examModel");

const addExamDataFilter = [
    check('exam_name')
        .isLength({ min: 3 })
        .withMessage('Lecture name is required!')
        .custom(async(exam_name) => {
            try{
                const exam = await Exam.findOne({where:{exam_name: exam_name}});
                if(exam){
                    throw createError('Exam is already created!');
                }
            }
            catch(err){
                throw createError(err.message);
            }
        }),
    check('exam_subject')
        .isLength({ min: 3 })
        .withMessage('Subject name is required!'),
    check('exam_topics')
        .isLength({ min: 3 })
        .withMessage('Lecture topics is required!')
        .trim(),
];

const updateExamDataFilter = [
    check('exam_subject')
        .isLength({ min: 3 })
        .withMessage('Subject name is required!'),
    check('exam_topics')
        .isLength({ min: 3 })
        .withMessage('Lecture topics is required!')
        .trim(),
];

examDataFilterHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if(Object.keys(mappedErrors).length===0){
        next();
    }
    else{
        res.status(500).json({
            errors: mappedErrors
        });
    }
};

module.exports = {
    addExamDataFilter,
    updateExamDataFilter,
    examDataFilterHandler
};