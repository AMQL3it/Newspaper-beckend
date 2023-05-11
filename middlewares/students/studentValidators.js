const { check, validationResult } = require("express-validator");
const createError = require('http-errors');
const Student = require("../../models/studentModel");

const addStudentDataFilter = [
    check('std_id')
        .custom(async(std_id) => {
            try{
                const student = await Student.findOne({where:{std_id: std_id}});
                if(student){
                    throw createError('Student is already used!');
                }
            }
            catch(err){
                throw createError(err.message);
            }
        }),
    check('std_name')
        .isLength({ min: 3 })
        .withMessage('Name is required!')
        .isAlpha("en-US", { ignore: ' -'})
        .withMessage('Name must contain anything other than Alphabet')
        .trim(),
    check('std_per_phone')
        .isMobilePhone('bn-BD', {
            strictMode: true
        })
        .withMessage('Mobile number must be a valid for Bangladesh'),
    check('std_gur_phone')
        .isMobilePhone('bn-BD', {
            strictMode: true
        })
        .withMessage('Mobile number must be a valid for Bangladesh'),
    check('std_dob')
        .isDate()
        .withMessage('Please enter a valid date of birth'),
    check('std_institute')
        .isLength({ min: 1 })
        .withMessage('Name is required!')
];

const updateStudentDataFilter = [
    check('std_name')
        .isLength({ min: 3 })
        .withMessage('Name is required!')
        .isAlpha("en-US", { ignore: ' -'})
        .withMessage('Name must contain anything other than Alphabet')
        .trim(),
    check('std_per_phone')
        .isMobilePhone('bn-BD', {
            strictMode: true
        })
        .withMessage('Mobile number must be a valid for Bangladesh'),
    check('std_gur_phone')
        .isMobilePhone('bn-BD', {
            strictMode: true
        })
        .withMessage('Mobile number must be a valid for Bangladesh')
];

studentDataFilterHandler = (req, res, next) => {
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
    addStudentDataFilter,
    updateStudentDataFilter,
    studentDataFilterHandler
};