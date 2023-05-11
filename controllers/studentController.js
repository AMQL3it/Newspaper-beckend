const Student = require("../models/studentModel");

exports.createStudent = async (req, res) => {
    let student = new Student({ ...req.body });

    try {
      const result = await student.save();
      return res.status(200).json({ message: "Student was added successfully", data: student });
      
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.updateStudent = async (req, res) => {
    const { std_id } = req.params;
    try {
        const student = await Student.findOne({ where: { std_id } });

        if(student){
            const updatedRows = await Student.update(req.body, { where: { std_id }, returning: true, });
            
            updatedRows[0] = await Student.findOne({ where: { std_id } });
            
            return res.json({ message: 'Student information updated successfully', data: updatedRows });
        } 
        return res.status(404).json({ message: `Student with id ${std_id} not found!!!` });  
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.deleteStudent = async (req, res) => {
    const { std_id } = req.params;
    try {
        const deletedRowsCount = await Student.destroy({ where: { std_id } });
        if (deletedRowsCount === 0) {
            return res.status(404).json({ message: `Student with id ${std_id} was not found!!!` });
        }
        return res.json({ message: 'Student information deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.getAllStudents = async (req, res) => {
    const { std_id } = req.params;
    try {
        const students = await Student.findAll();
        return res.status(200).json({ message: 'All students data fatched successfully', counter: students.length, data: students });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.getStudentById = async (req, res) => {
    const { std_id } = req.params;
    try {
        const student = await Student.findOne({ where: { std_id } });

        if (student) {
            return res.status(200).json({ message: 'Student data fatched successfully', data: student });
        }
        return res.status(404).json({ message: `Student with id ${std_id} was not found!!!` });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};