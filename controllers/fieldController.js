const Field = require("../models/fieldModel");
const Member = require("../models/memberModel");

// Create a new field
exports.createField = async (req, res) => {
    try {
      const { member_id } = req.params;
      let field = await Field.findOne({ where: { member_id: member_id, field_name: req.body.field_name } });
  
      if (!field) {
        let field = await Field.create({
            member_id,
            field_name: req.body.field_name,
            field_address: req.body.field_address,
        });
      
        return res.status(200).json({ message: 'Field created successfully', data: field });
      }
      return res.status(404).json({ message: 'Your request field are already exist in the system' });
  
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server Error');
    }
};
  
// Update field data.
exports.updateField = async (req, res) => {
    try {
      const field = await Field.findOne({
        where: {
          member_id: req.params.member_id,
          field_id: req.params.field_id,
        }
      });
  
      if(field){
        const updatedRows = await Field.update(req.body, {
          where: { member_id: req.params.member_id,field_id: req.params.field_id },
          returning: true,
        });
        
        updatedRows[0] = await Field.findOne({
          where: {
            member_id: req.params.member_id,
            field_id: req.params.field_id
          }
        });
        return res.status(200).json({ message: 'Field updated successfully', data: updatedRows });
      }
      return res.status(404).json({ message: `Field with id ${req.params.field_id} was not found!` });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server Error');
    }
};
  
// Destroy Field
exports.deleteField= async (req, res) => {
    const { member_id, field_id } = req.params;
    try {
      const deletedRowsCount = await Field.destroy({ where: { member_id, field_id } });
      if (deletedRowsCount === 0) {
        return res.status(404).json({ message: `Field with id ${field_id} was not found!` });
      }
      return res.status(200).json({ message: 'Field deleted successfully' });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server Error');
    }
};
  
// Get all fields for a member
exports.getFieldsByMemberId = async (req, res) => {
    try {
      const { member_id } = req.params;
      
      const fields = await Field.findAll({ where: { member_id } });
  
      return res.status(200).json({ message: 'Fields fatched successfully', counter:fields.length, data: fields });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server Error');
    }
};
  
// Get feild by id
exports.getFieldById = async (req, res) => {
    try {
        const { member_id, field_id } = req.params;
    
        const field = await Field.findOne({ where: { member_id, field_id } });
            
        if(field){
            return res.status(200).json({ message: 'Field fatched successfully', data: field });
        }

        return res.status(404).json({ message: `Field with id ${field_id} was not found!` });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server Error');
    }
};