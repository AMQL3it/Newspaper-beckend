const bcrypt = require('bcryptjs');
const Admin = require('../models/adminModel');

exports.createAdmin = async (req, res) => {
    const hashPassword = await bcrypt.hash(req.body.admin_password,10);

    let admin = new Admin({
        ...req.body,
        member_password: hashPassword
    });

    try {
        const result = await admin.save();
        return res.status(200).json({ message: "Admin was created successfully", data: admin });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.updateAdmin = async (req, res) => {
    const { admin_id } = req.params;

    try {
        const admin = await Admin.findOne({ where: { admin_id } });

        if(admin){
            const updatedRows = await Admin.update(req.body, { where: { admin_id }, returning: true, });

            updatedRows[0] = await Admin.findOne({ where: { admin_id } });

            return res.status(200).json({ message: 'Admin information updated successfully', data: updatedRows });
        } 

        return res.status(404).json({ message: `Admin with id ${admin_id} not found!!!` });  
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.deleteAdmin = async (req, res) => {
    const { admin_id } = req.params;
    const deletedRowsCount = await Admin.destroy({ where: { admin_id } });

    try {    
        if (deletedRowsCount === 0) {
            return res.status(404).json({ message: `Admin with id ${admin_id} was not found!` });
        }
        return res.status(500).json({ message: 'Admin information deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.getAllAdmins = async (req, res) => {
    const { admin_id } = req.params;
    try {
        const admins = await Admin.findAll();
  
        return res.status(200).json({ message: 'All admins data fatched successfully', counter: admins.length, data: admins });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.getAdminById = async (req, res) => {
    const { admin_id } = req.params;
    const admin = await Admin.findOne({ where: { admin_id } });

    try {
        if (admin) {
            return res.status(200).json({ message: 'Admin data fatched successfully', data: admin });
        }
        return res.status(404).json({ message: `Admin with id ${admin_id} was not found!` });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};