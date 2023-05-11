const { check, validationResult } = require("express-validator");
const createError = require('http-errors');
const Teacher = require("../../models/teacherModel");

const addTeacherDataFilter = [
    check('tch_name')
        .isLength({ min: 3 })
        .withMessage('Name is required!')
        .isAlpha("en-US", { ignore: ' -'})
        .withMessage('Name must contain anything other than Alphabet')
        .trim(),
    check('tch_email')
        .isEmail()
        .withMessage('Invalid email address')
        .trim()
        .custom(async(tch_email) => {
            try{
                const teacher = await Teacher.findOne({where:{tch_email: tch_email}});
                if(teacher){
                    throw createError('Email is already used!');
                }
            }
            catch(err){
                throw createError(err.message);
            }
        }),
    check('tch_phone')
        .isMobilePhone('bn-BD', {
            strictMode: true
        })
        .withMessage('Mobile number must be a valid for Bangladesh')
        .custom(async(tch_phone) => {
            try{
                const teacher = await Teacher.findOne({where: {tch_phone: tch_phone}});
                if(teacher){
                    throw createError('Mobile number is already used!');
                }
            }
            catch(err){
                throw createError(err.message);
            }
        }),
    check('tch_institute')
        .isLength({ min: 1 })
        .withMessage('Intitute name is required!')
];

const updateTeacherDataFilter = [
    check('tch_name')
        .isLength({ min: 3 })
        .withMessage('Name is required!')
        .isAlpha("en-US", { ignore: ' -'})
        .withMessage('Name must contain anything other than Alphabet')
        .trim(),
    check('tch_email')
        .isEmail()
        .withMessage('Invalid email address')
        .trim()
        .custom(async(tch_email) => {
            try{
                const teacher = await Teacher.findAll({where:{tch_email: tch_email}});
                if(teacher.length>1){
                    throw createError('Email is already used!');
                }
            }
            catch(err){
                throw createError(err.message);
            }
        }),
    check('tch_phone')
        .isMobilePhone('bn-BD', {
            strictMode: true
        })
        .withMessage('Mobile number must be a valid for Bangladesh')
        .custom(async(tch_phone) => {
            try{
                const teacher = await Teacher.findAll({where: {tch_phone: tch_phone}});
                if(teacher.length>1){
                    throw createError('Mobile number is already used!');
                }
            }
            catch(err){
                throw createError(err.message);
            }
        })
];

teacherDataFilterHandler = (req, res, next) => {
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
    addTeacherDataFilter,
    updateTeacherDataFilter,
    teacherDataFilterHandler
};