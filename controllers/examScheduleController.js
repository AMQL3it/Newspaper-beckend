const Exam_Schedule = require("../models/examScheduleModel");

exports.createExamSchedule = async (req, res) => {
    let exam_schedule = new Exam_Schedule({ ...req.body });

    try {
        const result = await exam_schedule.save();
        return res.status(200).json({ message: "Exam Schedule was added successfully", data: exam_schedule });
      
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.updateExamSchedule = async (req, res) => {
    const { ex_schd_id } = req.params;
    try {
        const exam_schedule = await Exam_Schedule.findOne({ where: { ex_schd_id } });

        if(exam_schedule){
            const updatedRows = await Exam_Schedule.update(req.body, { where: { ex_schd_id }, returning: true, });
            
            updatedRows[0] = await Exam_Schedule.findOne({ where: { ex_schd_id } });
            
            return res.json({ message: 'Exam Schedule information updated successfully', data: updatedRows });
        } 
        return res.status(404).json({ message: `Exam Schedule with id ${ex_schd_id} not found!!!` });  
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.deleteExamSchedule = async (req, res) => {
    const { ex_schd_id } = req.params;
    try {
        const deletedRowsCount = await Exam_Schedule.destroy({ where: { ex_schd_id } });
        if (deletedRowsCount === 0) {
            return res.status(404).json({ message: `Exam Schedule with id ${ex_schd_id} was not found!!!` });
        }
        return res.json({ message: 'Exam Schedule information deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.getAllExamSchedules = async (req, res) => {
    const { ex_schd_id } = req.params;
    try {
        const exam_schedules = await Exam_Schedule.findAll();
        return res.status(200).json({ message: 'All Exam Schedules data fatched successfully', counter: exam_schedules.length, data: exam_schedules });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.getExamScheduleById = async (req, res) => {
    const { ex_schd_id } = req.params;
    try {
        const exam_schedule = await Exam_Schedule.findOne({ where: { ex_schd_id } });

        if (exam_schedule) {
            return res.status(200).json({ message: 'Exam Schedule data fatched successfully', data: exam_schedule });
        }
        return res.status(404).json({ message: `Exam Schedule with id ${ex_schd_id} was not found!!!` });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};