 const Package = require('../../models/packageModel.js');

// Get all packages
const getAllPackages = async (req, res) => {
    try {
        const allPackages = await Package.find().sort({ createdAt: -1 });
        res.json({ success: true, data: allPackages });
    } catch (error) {
        console.error('Error fetching packages:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Get single package by id
const getPackage = async (req, res) => {
    try {
        const pack = await Package.findById(req.params.id);
        if (!pack) {
            return res.status(404).json({ success: false, message: "Package not found" });
        }
        res.json({ success: true, data: pack });
    } catch (error) {
        console.error('Error fetching package:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = {
    getAllPackages,
    getPackage
};
