const express = require('express');

const fieldController = require('../controllers/fieldController');
const buildingController = require('../controllers/buildingController');
const roomController = require('../controllers/roomController');
const { checkLogin, redirectLoggedIn } = require('../middlewares/common/loginGuards');

const router = express.Router();

// Members routes
//router.post('/members', createMember .createMember);
//router.put('/members/:member_id', methodMember.updateMember);
//router.delete('/members/:member_id', methodMember.deleteMember);
//router.get('/members', methodMember.getMembers);
//router.get('/members/:member_id', methodMember.getMemberById);

// Field routes
router.post('/:member_id/fields', fieldController.createField);
router.put('/:member_id/fields/:field_id', fieldController.updateField);
router.delete('/:member_id/fields/:field_id', fieldController.deleteField);
router.get('/:member_id/fields', fieldController.getFieldsByMemberId);
router.get('/:member_id/fields/:field_id', fieldController.getFieldById);

// Building routes
router.post('/:member_id/fields/:field_id/buildings', buildingController.createBuilding);
router.put('/:member_id/fields/:field_id/buildings/:building_id', buildingController.updateBuilding);
router.delete('/:member_id/fields/:field_id/buildings/:building_id', buildingController.deleteBuilding);
router.get('/:member_id/fields/:field_id/buildings', buildingController.getBuildingsByFieldId);
router.get('/:member_id/fields/:field_id/buildings/:building_id', buildingController.getBuildingById);

// Room routes
router.post('/:member_id/fields/:field_id/buildings/:building_id/rooms', roomController.createRoom);
router.put('/:member_id/fields/:field_id/buildings/:building_id/rooms/:room_id', roomController.updateRoom);
router.delete('/:member_id/fields/:field_id/buildings/:building_id/rooms/:room_id', roomController.deleteRoom);
router.get('/:member_id/fields/:field_id/buildings/:building_id/rooms', roomController.getRoomsByBuildingId);
router.get('/:member_id/fields/:field_id/buildings/:building_id/rooms/:room_id', roomController.getRoomById);

module.exports = router;