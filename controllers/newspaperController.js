const Newspaper = require("../models/newspaperModel");

// Create a new newspaper
exports.createNewspaper = async (req, res) => {
    try {
        const newspaper = await Newspaper.findOne({
            where: {
            paper_name: req.body.paper_name
            }
        });
    
        if(!newspaper){
            const newspaper = await Newspaper.create(req.body);
            return res.status(200).json({ message: "Newspaper created successfully", data: newspaper });
        }
        return res.status(404).json({ message: "This newspaper is already created!!!" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
};
  
// Newspaper update
exports.updateNewspaper = async (req, res) => {
    try {
        const newspaper = await Newspaper.findOne({
            where: {
            paper_id: req.params.paper_id
            }
        });
  
        if(newspaper){
            const updatedRows = await Newspaper.update(req.body, {
                where: { paper_id: req.params.paper_id },
                returning: true,
            });
                
            updatedRows[0] = await Newspaper.findOne({
                where: {
                    paper_id: req.params.paper_id
                }
            });
            return res.json({ message: 'Newspaper updated successfully', data: updatedRows });
        }
        return res.status(404).json({ message: `Newspaper with id ${req.params.paper_id} not found` });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
};
  
// Destroy newspaper
exports.deleteNewspaper = async (req, res) => {
    const { paper_id } = req.params;
    try {
        const deletedRowsCount = await Newspaper.destroy({ where: { paper_id } });
        if (deletedRowsCount === 0) {
            return res.status(404).json({ message: `Newspaper with id ${paper_id} not found` });
        }
        return res.json({ message: 'Newspaper deleted successfully' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
};
  
// Get all newspapers
exports.getNewspapers = async (req, res) => {
    try {
        const newspapers = await Newspaper.findAll();
        return res.status(200).json({ message: "All newspapers fetched successfully", data: newspapers });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
};
  
// Get a newspaper by ID
exports.getNewspaperById = async (req, res) => {
    try {
        const newspaper = await Newspaper.findOne({
            where: {
            paper_id: req.params.paper_id
            }
        });
    
        if (newspaper) {
            return res.status(200).json({ message: "Newspaper fetched successfuly", data: newspaper });
        }
        return res.status(404).json({ msg: 'This newspaper not found '});
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
};