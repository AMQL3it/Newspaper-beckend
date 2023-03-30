const express = require('express');
const { createMember } = require('../controllers/adminController');
const { avaterUpload } = require('../middlewares/members/avaterUpload');
const {
    addMemberValidators,
    addMemberValidatorHandler
} = require('../middlewares/members/memberValidators');

const router = express.Router();

router.post('/register', avaterUpload, addMemberValidators, addMemberValidatorHandler, createMember);

module.exports = router;
