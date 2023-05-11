const { check, validationResult } = require("express-validator");
const Admin = require("../../models/adminModel");
const createError = require('http-errors');

const addAdminDataFilter = [
    check('admin_name')
        .isLength({ min: 5 })
        .withMessage('Name is required!')
        .isAlpha("en-US", { ignore: ' -'})
        .withMessage('Name must contain anything other than Alphabet')
        .trim(),
    check('admin_email')
        .isEmail()
        .withMessage('Invalid email address')
        .trim()
        .custom(async(admin_email) => {
            try{
                const admin = await Admin.findOne({where:{admin_email: admin_email}});
                if(admin){
                    throw createError('Email is already used!');
                }
            }
            catch(err){
                throw createError(err.message);
            }
        }),
    check('admin_phone')
        .isMobilePhone('bn-BD', {
            strictMode: true
        })
        .withMessage('Mobile number must be a valid for Bangladesh')
        .custom(async(admin_phone) => {
            try{
                const admin = await Admin.findOne({where: {admin_phone: admin_phone}});
                if(admin){
                    throw createError('Mobile number is already used!');
                }
            }
            catch(err){
                throw createError(err.message);
            }
        }),
    check('admin_password')
        .isStrongPassword()
        .withMessage("Password must be strong")
];

const updateAdminDataFilter = [
    check('admin_name')
        .isAlpha("en-US", { ignore: ' -'})
        .withMessage('Name must contain anything other than Alphabet')
        .trim(),
    check('admin_email')
        .isEmail()
        .withMessage('Invalid email address')
        .trim()
        .custom(async(admin_email) => {
            try{
                const admin = await Admin.findAll({where:{admin_email: admin_email}});
                if(admin.length>1){
                    throw createError('Email is already used!');
                }
            }
            catch(err){
                throw createError(err.message);
            }
        }),
    check('admin_phone')
        .isMobilePhone('bn-BD', {
            strictMode: true
        })
        .withMessage('Mobile number must be a valid for Bangladesh')
        .custom(async(admin_phone) => {
            try{
                const admin = await Admin.findAll({where: {admin_phone: admin_phone}});
                if(admin.length>1){
                    throw createError('Mobile number is already used!');
                }
            }
            catch(err){
                throw createError(err.message);
            }
        })
];

adminDataFilterHandler = (req, res, next) => {
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
    addAdminDataFilter,
    updateAdminDataFilter,
    adminDataFilterHandler
};