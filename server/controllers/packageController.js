
const Package = require('../models/packageModel.js');

const getAllPackages = async (req, res) => {
    const allPackages = await Package.find()
    

    res.render('index' , {
        component: "allPackages",
        allPackages,
        currentPage : 'ourPackage',
        searchPlace : 'package',
        
    })
}

// Render add package form
const addPackagePage = async (req, res) => {
    
    res.render('index' , {
        component: "addPackage",
        currentPage : 'ourPackage',
        
    })
}

// Add a new package 
const addPackage = async (req, res) => {
    const { title, details, fromDate, toDate, isActive } = req.body;
    const image = req.file ? req.file.filename : 'default.jpg';

    try {
        const newPackage = new Package({
            title,
            details,
            image,
            fromDate,
            toDate,
            isActive: isActive ? true : false
        });

        await newPackage.save();
        res.redirect('/package');
    } catch (error) {
        console.error('Error adding package item:', error);
        res.status(500).send('Internal Server Error');
    }

}

const editPackagePage = async (req,res) => {
    
    const package = await Package.findById(req.params.id);
    res.render("index", {
        component: 'editPackage',
        currentPage:'ourPackage',
        package,
        
    });
}

const editPackage = async (req,res) => {
    try {
        const { title, details, fromDate, toDate, isActive } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const updateData = {
            title,
            details,
            fromDate,
            toDate,
            isActive: isActive ? true : false
        };

        if (image) updateData.image = image;

        await Package.findByIdAndUpdate(req.params.id, updateData);

        res.redirect('/package');
    } catch (err) {
        console.error("Error editing package:", err);
        res.status(500).send("Internal Server Error");
    }
}




const deletePackage = async (req,res) => {
    await Package.findByIdAndDelete(req.params.id)
    res.redirect('/package')
}

module.exports = {
    getAllPackages,
    addPackagePage,
    addPackage,
    editPackagePage,
    editPackage,
    deletePackage
}