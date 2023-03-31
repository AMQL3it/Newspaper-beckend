const express = require('express');
const { createMember } = require('../controllers/adminController');
const { avaterUpload } = require('../middlewares/members/avaterUpload');
const {
    addMemberValidators,
    addMemberValidatorHandler
} = require('../middlewares/members/memberValidators');
const newspaperController = require('../controllers/newspaperController');

const router = express.Router();

router.post('/register', avaterUpload, addMemberValidators, addMemberValidatorHandler, createMember);

// Newspapers routes
router.post('/papers', newspaperController.createNewspaper);
router.put('/papers/:paper_id', newspaperController.updateNewspaper);
router.delete('/papers/:paper_id', newspaperController.deleteNewspaper);
router.get('/papers', newspaperController.getNewspapers);
router.get('/papers/:paper_id', newspaperController.getNewspaperById);

module.exports = router;
