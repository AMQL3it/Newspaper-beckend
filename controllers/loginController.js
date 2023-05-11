const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const Member = require('../models/adminModel');
const { Op } = require('sequelize');


exports.loginAccess = async (req, res) => {
    try{
        // find a member who has this email/username
        const member = await Member.findOne({
            where: {
              [Op.or]: [
                { member_email: req.body.userName },
                { member_phone: req.body.userName }
              ]
            }
        });

        if(member){
            const isValidPassword = await bcrypt.compare(req.body.userPassword, member.member_password);

            if(isValidPassword){
                // prepare the member object to generate token
                const memberObject = {
                    userName: member.member_name, 
                    userEmail: member.member_email, 
                    userPhone: member.member_phone
                };

                // generate token
                const token = jwt.sign(memberObject,process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRY,
                });

                // set cookie
                res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge: process.env.JWT_EXPIRY,
                    httpOnly: true,
                    signed: true
                });

                // set logged in member locals identification
                res.locals.loggedInMember = memberObject;

                res.status(200).json({
                    message: "Admin was login successfully",
                    //token: token
                    data: memberObject
                });
            }else{
                res.status(404).json({
                    message: "Login failed! Please check your password."    
                });
            }
        }else{
            res.status(404).json({
                message: "Login failed! This user doesn't exist yeat. "    
            });
        }
    }
    catch(err){
        res.status(404).json({
            message: "Login failed! This user doesn't exist yeat. "    
        });
    }
};

exports.logout = (req, res) => {
    //res.clearCookie(process.env,COOKIE_NAME);
    res.status(200).clearCookie(process.env.COOKIE_NAME).json({
        message: "Logout successfully",
    });
}

exports.getRegisterForm = (req, res) => {
    //res.locals.title = "Login Page";
    //res.render('registerPage');
};