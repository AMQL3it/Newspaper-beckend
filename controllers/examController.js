const Exam = require("../models/examModel");

exports.createExam = async (req, res) => {
    let exam = new Exam({ ...req.body });

    try {
        const result = await exam.save();
        return res.status(200).json({ message: "Exam was added successfully", data: exam });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.updateExam = async (req, res) => {
    const { exam_id } = req.params;
    try {
        const exam = await Exam.findOne({ where: { exam_id } });

        if(exam){
            const updatedRows = await Exam.update(req.body, { where: { exam_id }, returning: true, });
            
            updatedRows[0] = await Exam.findOne({ where: { exam_id } });
            return res.json({ message: 'Exam information updated successfully', data: updatedRows });
        } 
        return res.status(404).json({ message: `Exam with id ${exam_id} not found!!!` });  
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.deleteExam = async (req, res) => {
    const { exam_id } = req.params;
    try {
        const deletedRowsCount = await Exam.destroy({ where: { exam_id } });
        if (deletedRowsCount === 0) {
            return res.status(404).json({ message: `Exam with id ${exam_id} was not found` });
        }
        return res.json({ message: 'Exam information deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.getAllExams = async (req, res) => {
    const { exam_id } = req.params;
    try {
        const exams = await Exam.findAll();
        return res.status(200).json({ message: 'All exams data fatched successfully', counter: exams.length, data: exams });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.getExamById = async (req, res) => {
    const { exam_id } = req.params;
    try {
        const exam = await Exam.findOne({ where: { exam_id } });

        if (exam) {
            return res.status(200).json({ message: 'Exam data fatched successfully', data: exam });
        }
        return res.status(404).json({ message: `Exam with id ${exam_id} was not found` });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};