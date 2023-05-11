const { check, validationResult } = require("express-validator");
const createError = require('http-errors');
const Lecture = require("../../models/lectureModel");

const addLectureDataFilter = [
    check('lec_name')
        .isLength({ min: 3 })
        .withMessage('Lecture name is required!')
        .custom(async(lec_name) => {
            try{
                const lecture = await Lecture.findOne({where:{lec_name: lec_name}});
                if(lecture){
                    throw createError('Lecture is already created!');
                }
            }
            catch(err){
                throw createError(err.message);
            }
        }),
    check('lec_subject')
        .isLength({ min: 3 })
        .withMessage('Subject name is required!'),
    check('lec_topics')
        .isLength({ min: 3 })
        .withMessage('Lecture topics is required!')
        .trim(),
];

const updateLectureDataFilter = [
    check('lec_subject')
        .isLength({ min: 3 })
        .withMessage('Subject name is required!'),
    check('lec_topics')
        .isLength({ min: 3 })
        .withMessage('Lecture topics is required!')
        .trim(),
];

lectureDataFilterHandler = (req, res, next) => {
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
    addLectureDataFilter,
    updateLectureDataFilter,
    lectureDataFilterHandler
};