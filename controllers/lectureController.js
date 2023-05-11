const Lecture = require("../models/lectureModel");

exports.createLecture = async (req, res) => {
    let lecture = new Lecture({ ...req.body });

    try {
        const result = await lecture.save();
        return res.status(200).json({ message: "Lecture was added successfully", data: lecture });
      
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.updateLecture = async (req, res) => {
    const { lec_id } = req.params;
    try {
        const lecture = await Lecture.findOne({ where: { lec_id } });

        if(lecture){
            const updatedRows = await Lecture.update(req.body, { where: { lec_id }, returning: true, });
            
            updatedRows[0] = await Lecture.findOne({ where: { lec_id } });
            return res.json({ message: 'Lecture information updated successfully', data: updatedRows });
        } 
        return res.status(404).json({ message: `Lecture with id ${lec_id} not found!!!` });  
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.deleteLecture = async (req, res) => {
    const { lec_id } = req.params;
    try {
        const deletedRowsCount = await Lecture.destroy({ where: { lec_id } });
        if (deletedRowsCount === 0) {
            return res.status(404).json({ message: `Lecture with id ${lec_id} was not found` });
        }
        return res.json({ message: 'Lecture information deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.getAllLectures = async (req, res) => {
    const { lec_id } = req.params;
    try {
        const lectures = await Lecture.findAll();

        return res.status(200).json({ message: 'All lectures data fatched successfully', counter: lectures.length, data: lectures });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.getLectureById = async (req, res) => {
    const { lec_id } = req.params;
    try {
        const lecture = await Lecture.findOne({ where: { lec_id } });

        if (lecture) {
            return res.status(200).json({ message: 'Lecture data fatched successfully', data: lecture });
        }
        return res.status(404).json({ message: `Lecture with id ${lec_id} was not found` });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};