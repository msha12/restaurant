const Menu = require('../../models/menuModel');

// Get all menu items with pagination and search
const getAllMenu = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const search = req.query.search || '';
        const query = search
            ? {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { chef: { $regex: search, $options: 'i' } }
                ]
            }
            : {};

        const total = await Menu.countDocuments(query);
        const allMenu = await Menu.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalPages = Math.ceil(total / limit);

        res.json({
            success: true,
            data: allMenu,
            pagination: {
                total,
                page,
                totalPages
            }
        });
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Get single menu item by id
const getMeal = async (req, res) => {
    try {
        const meal = await Menu.findById(req.params.id);
        if (!meal) {
            return res.status(404).json({ success: false, message: "Menu item not found" });
        }
        res.json({ success: true, data: meal });
    } catch (error) {
        console.error('Error fetching menu item:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = {
    getAllMenu,
    getMeal
};
