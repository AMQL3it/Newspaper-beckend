const Teacher = require("../models/teacherModel");

exports.createTeacher = async (req, res) => {
    let teacher = new Teacher({ ...req.body });

    try {
        const result = await teacher.save();
        return res.status(200).json({ message: "Teacher was added successfully", data: teacher });
      
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.updateTeacher = async (req, res) => {
    const { tch_id } = req.params;
    try {
        const teacher = await Teacher.findOne({ where: { tch_id } });

        if(teacher){
            const updatedRows = await Teacher.update(req.body, { where: { tch_id }, returning: true, });
            
            updatedRows[0] = await Teacher.findOne({ where: { tch_id } });
            
            return res.json({ message: 'Teacher information updated successfully', data: updatedRows });
        } 
        return res.status(404).json({ message: `Teacher with id ${tch_id} not found!!!` });  
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.deleteTeacher = async (req, res) => {
    const { tch_id } = req.params;
    try {
        const deletedRowsCount = await Teacher.destroy({ where: { tch_id } });
        if (deletedRowsCount === 0) {
            return res.status(404).json({ message: `Teacher with id ${tch_id} was not found!!!` });
        }
        return res.json({ message: 'Teacher information deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.getAllTeachers = async (req, res) => {
    const { tch_id } = req.params;
    try {
        const teachers = await Teacher.findAll();
        return res.status(200).json({ message: 'All teachers data fatched successfully', counter: teachers.length, data: teachers });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.getTeacherById = async (req, res) => {
    const { tch_id } = req.params;
    try {
        const teacher = await Teacher.findOne({ where: { tch_id } });

        if (teacher) {
            return res.status(200).json({ message: 'Teacher data fatched successfully', data: teacher });
        }
        return res.status(404).json({ message: `Teacher with id ${tch_id} was not found!!!` });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};