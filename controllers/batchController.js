const Batch = require("../models/batchModel");

exports.createBatch = async (req, res) => {
    let batch = new Batch({...req.body});

    try {
        const result = await batch.save();
        return res.status(200).json({ message: "Batch was created successfully", data: batch });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.updateBatch = async (req, res) => {
    const { bat_id } = req.params;
    try {
        const batch = await Batch.findOne({ where: { bat_id } });

        if(batch){
            const updatedRows = await Batch.update(req.body, { where: { bat_id }, returning: true, });
            
            updatedRows[0] = await Batch.findOne({ where: { bat_id } });
            return res.json({ message: 'Batch information updated successfully', data: updatedRows });
        } 
        return res.status(404).json({ message: `Batch with id ${bat_id} not found!!!` });  
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.deleteBatch = async (req, res) => {
    const { bat_id } = req.params;
    try {
        const deletedRowsCount = await Batch.destroy({ where: { bat_id } });
        if (deletedRowsCount === 0) {
            return res.status(404).json({ message: `Batch with id ${bat_id} was not found` });
        }
        return res.status(200).json({ message: 'Batch information deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.getAllBatches = async (req, res) => {
    const { bat_id } = req.params;
    try {
        const batches = await Batch.findAll();

        return res.status(200).json({ message: 'All batches data fatched successfully', counter: batches.length, data: batches });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.getBatchById = async (req, res) => {
    const { bat_id } = req.params;
    try {
        const batch = await Batch.findOne({ where: { bat_id } });

        if (batch) {
            return res.status(200).json({ message: 'Batch data fatched successfully', data: batch });
        }
        return res.status(404).json({ message: `Batch with id ${bat_id} was not found` });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};