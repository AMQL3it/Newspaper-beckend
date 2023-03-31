const Room = require("../models/roomModel");

// Create room
exports.createRoom = async (req, res) => {
    try {
        const { member_id, field_id, building_id } = req.params;
        const  room = await Room.findOne({ where: { building_id: building_id, room_number: req.body.room_number } });
  
        if(!room) {
            const room = await Room.create({
                building_id,
                room_number: req.body.room_number,
                newspapers: req.body.newspapers,
            });
      
            return res.status(200).json({ message: 'Room created successfully', data: room });
        }
        return res.status(404).json({ message: `${req.body.room_number} room is already created` });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
};
  
// Update room
exports.updateRoom = async (req, res) => {
    try {
        const room = await Room.findOne({
            where: {
                room_id: req.params.room_id,
                building_id: req.params.building_id,
            }
        });
  
        if(room){
            const updatedRows = await Room.update(req.body, {
                where: { building_id: req.params.building_id,room_id: req.params.room_id },
                returning: true,
            });
              
            updatedRows[0] = await Room.findOne({
                where: {
                    room_id: req.params.room_id,
                    building_id: req.params.building_id,
                }
            });
            return res.json({ message: 'Room updated successfully', data: updatedRows });
        } 
        return res.status(404).json({ message: `Room with id ${req.params.room_id} not found` });  
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
};
  
// Destroy Room
exports.deleteRoom = async (req, res) => {
    const { member_id, field_id, building_id, room_id } = req.params;
    try {
        const deletedRowsCount = await Room.destroy({ where: { building_id, room_id } });
        if (deletedRowsCount === 0) {
            return res.status(404).json({ message: `Room with id ${building_id} was not found` });
        }
        return res.json({ message: 'Room deleted successfully' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
};
  
// Get all rooms in a building
exports.getRoomsByBuildingId = async (req, res) => {
    try {
        const { member_id, field_id, building_id } = req.params;
  
        const rooms = await Room.findAll({ where: { building_id } });
  
        return res.status(200).json({ message: 'Room fatched successfully', counter: rooms.length, data: rooms });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
};
  
// Get room by id
exports.getRoomById = async (req, res) => {
    try {
        const { member_id, field_id, building_id, room_id } = req.params;
        const room = await Room.findOne({ where: { room_id: room_id, building_id: building_id } });
  
        if (room) {
            return res.status(200).json({ message: 'Room fatched successfully', data: room });
        }
        return res.status(404).json({ message: 'Room not found' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
};