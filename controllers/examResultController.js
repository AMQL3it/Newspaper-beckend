const Exam_Result = require("../models/examResultModel");

exports.createExamResult = async (req, res) => {
    let exam_result = new Exam_Result({ ...req.body });

    try {
        const result = await exam_result.save();
        return res.status(200).json({ message: "Exam Result was added successfully", data: exam_result });
      
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.updateExamResult = async (req, res) => {
    const { ex_res_id } = req.params;
    try {
        const exam_result = await Exam_Result.findOne({ where: { ex_res_id } });

        if(exam_result){
            const updatedRows = await Exam_Result.update(req.body, { where: { ex_res_id }, returning: true, });
            
            updatedRows[0] = await Exam_Result.findOne({ where: { ex_res_id } });
            
            return res.json({ message: 'Exam Result information updated successfully', data: updatedRows });
        } 
        return res.status(404).json({ message: `Exam Result with id ${ex_res_id} not found!!!` });  
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.deleteExamResult = async (req, res) => {
    const { ex_res_id } = req.params;
    try {
        const deletedRowsCount = await Exam_Result.destroy({ where: { ex_res_id } });
        if (deletedRowsCount === 0) {
            return res.status(404).json({ message: `Exam Result with id ${ex_res_id} was not found!!!` });
        }
        return res.json({ message: 'Exam Result information deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.getAllExamResults = async (req, res) => {
    const { ex_res_id } = req.params;
    try {
        const exam_results = await Exam_Result.findAll();
        return res.status(200).json({ message: 'All Exam Results data fatched successfully', counter: exam_results.length, data: exam_results });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.getExamResultById = async (req, res) => {
    const { ex_res_id } = req.params;
    try {
        const exam_result = await Exam_Result.findOne({ where: { ex_res_id } });

        if (exam_result) {
            return res.status(200).json({ message: 'Exam Result data fatched successfully', data: exam_result });
        }
        return res.status(404).json({ message: `Exam Result with id ${ex_res_id} was not found!!!` });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};