const Class_Schedule = require("../models/classScheduleModel");

exports.createClassSchedule = async (req, res) => {
    let class_schedule = new Class_Schedule({ ...req.body });

    try {
        const result = await class_schedule.save();
        return res.status(200).json({ message: "Class Schedule was added successfully", data: class_schedule });
      
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.updateClassSchedule = async (req, res) => {
    const { cl_schd_id } = req.params;
    try {
        const class_schedule = await Class_Schedule.findOne({ where: { cl_schd_id } });

        if(class_schedule){
            const updatedRows = await Class_Schedule.update(req.body, { where: { cl_schd_id }, returning: true, });
            
            updatedRows[0] = await Class_Schedule.findOne({ where: { cl_schd_id } });
            
            return res.json({ message: 'Class Schedule information updated successfully', data: updatedRows });
        } 
        return res.status(404).json({ message: `Class Schedule with id ${cl_schd_id} not found!!!` });  
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.deleteClassSchedule = async (req, res) => {
    const { cl_schd_id } = req.params;
    try {
        const deletedRowsCount = await Class_Schedule.destroy({ where: { cl_schd_id } });
        if (deletedRowsCount === 0) {
            return res.status(404).json({ message: `Class Schedule with id ${cl_schd_id} was not found!!!` });
        }
        return res.json({ message: 'Class Schedule information deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.getAllClassSchedules = async (req, res) => {
    const { cl_schd_id } = req.params;
    try {
        const class_schedules = await Class_Schedule.findAll();
        return res.status(200).json({ message: 'All Class Schedules data fatched successfully', counter: class_schedules.length, data: class_schedules });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.getClassScheduleById = async (req, res) => {
    const { cl_schd_id } = req.params;
    try {
        const class_schedule = await Class_Schedule.findOne({ where: { cl_schd_id } });

        if (class_schedule) {
            return res.status(200).json({ message: 'Class Schedule data fatched successfully', data: class_schedule });
        }
        return res.status(404).json({ message: `Class Schedule with id ${cl_schd_id} was not found!!!` });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};