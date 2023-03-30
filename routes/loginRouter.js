const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');
const { doLoginValidators, doLoginValidatorHandler } = require('../middlewares/login/loginValidators');

//router.get('/', decorateHtmlResponse('Login') ,loginController.getLogin);
//router.get('/register', decorateHtmlResponse('Register') ,loginController.getRegisterForm);

router.post('/login',doLoginValidators, doLoginValidatorHandler, loginController.loginAccess);

router.delete('/logout',loginController.logout);

module.exports = router;