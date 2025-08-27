const Chef = require('../../models/chefModel');

// Get all chefs
const getAllChefs = async (req, res) => {
    try {
        const allChefs = await Chef.find();
        res.json({ success: true, data: allChefs });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching chefs" });
    }
};

// Get single chef by id
const getChef = async (req, res) => {
    try {
        const chef = await Chef.findById(req.params.id);
        if (!chef) return res.status(404).json({ success: false, message: "Chef not found" });
        res.json({ success: true, data: chef });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching chef" });
    }
};

module.exports = {
    getAllChefs,
    getChef
};
