const bcrypt = require('bcryptjs');
const Member = require('../models/memberModel');

exports.createMember = async (req, res) => {
    let newMember;
    const hashPassword = await bcrypt.hash(req.body.member_password,10);

    if(req.files && req.files.length > 0){
        newMember = new Member({
            ...req.body,
            avater: req.files[0].filename,
            member_password: hashPassword
        });
    }
    else{
        newMember = new Member({
            ...req.body,
            member_password: hashPassword
        });
    }

    try {
      const result = await newMember.save();
      res.status(200).json({
        message: "Member was added successfully"
      });
      
    } catch (err) {
        res.status(200).json({
            errors: {
                common: {
                    message: "Unknowen error occurs"
                }
            }
          });
    }
};