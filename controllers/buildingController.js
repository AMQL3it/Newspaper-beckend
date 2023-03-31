const Building = require("../models/buildingModel");
const Field = require("../models/fieldModel");

// Building create
exports.createBuilding = async (req, res) => {
    try {
        const { member_id, field_id } = req.params;
        const  building = await Building.findOne({ where: { field_id: field_id, building_name: req.body.building_name } });
    
        if(!building) {
            const building = await Building.create({
                field_id,
                building_name: req.body.building_name,
                building_address: req.body.building_address,
            });
            
            return res.status(200).json({ message: 'Building created successfully', data: building });
        }
        return res.status(404).json({ message: `${req.body.building_name} building is already created` });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server Error');
    }
};
  
// Update building data
exports.updateBuilding = async (req, res) => {
    try {
        const building = await Building.findOne({
            where: {
            field_id: req.params.field_id,
            building_id: req.params.building_id,
            }
        });
  
        if(building){
            const updatedRows = await Building.update(req.body, {
                where: { building_id: req.params.building_id,field_id: req.params.field_id },
                returning: true,
            });
            
            updatedRows[0] = await Building.findOne({
                where: {
                    field_id: req.params.field_id,
                    building_id: req.params.building_id,
                }
            });
            return res.status(200).json({ message: 'Building updated successfully', data: updatedRows });
        }
        return res.status(404).json({ message: `Building with id ${req.params.building_id} not found` });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
};
  
// Destroy building
exports.deleteBuilding= async (req, res) => {
    const { member_id, field_id, building_id } = req.params;
    try {
        const deletedRowsCount = await Building.destroy({ where: { building_id, field_id } });
        if (deletedRowsCount === 0) {
            return res.status(404).json({ message: `Building with id ${building_id} was not found` });
        }
        return res.status(200).json({ message: 'Building deleted successfully' });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server Error');
    }
};
  
// Get all buildings
exports.getBuildingsByFieldId = async (req, res) => {
    try {
        const { member_id, field_id } = req.params;
        
        const buildings = await Building.findAll({ where: { field_id } });
  
        return res.status(200).json({ message: 'Buildings fatched successfully', counter: buildings.length, data: buildings });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
};
  
// Get builing by id
exports.getBuildingById = async (req, res) => {
    try {
        const { member_id, field_id, building_id } = req.params;
        const building = await Building.findOne({ where: { field_id: field_id, building_id: building_id } });
    
        if (!building) {
            return res.status(404).json({ message: `Building with id ${building_id} was not found` });
        }

        return res.status(200).json({ message: 'Building fatched successfully', data: building });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
};