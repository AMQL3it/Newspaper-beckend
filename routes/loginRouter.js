const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');
const { loginDataFilter, loginDataFilterHandler } = require('../middlewares/login/loginValidators');

router.post('/login', loginDataFilter, loginDataFilterHandler, loginController.loginAccess);

router.delete('/logout',loginController.logout);

module.exports = router;