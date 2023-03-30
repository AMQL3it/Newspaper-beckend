const { check, validationResult } = require("express-validator");
const createError = require('http-errors');

const doLoginValidators = [
    check('userName')
        .isLength({ min: 1 })
        .withMessage('Mobile number or Email is required!')
        .trim(),
    check('userPassword')
        .isLength({ min: 1 })
        .withMessage('Password is required!')
        .trim()
];


doLoginValidatorHandler = (req, res, next) => {
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
    doLoginValidators,
    doLoginValidatorHandler
};