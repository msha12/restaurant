const Chef = require('../models/chefModel')
const categories = ['breakfast', 'lunch', 'dinner', 'dessert','drinks'];

const getAllChefs = async (req,res) =>  {

    const allChefs = await Chef.find()

    res.render('index' , {
        component: "allChefs",
        allChefs,
        currentPage : 'ourChefs',
        searchPlace : 'chef',
    })

}

const getChef = async (req, res) => {
    const chef = await Chef.findById(req.params.id)
    const crumbs = breadcrumbs(req)
    res.render('index',{
        component: "ShowChef",
        chef,
        currentPage : 'ourChefs',
        crumbs
    })
}

const addChefPage = async (req,res) => {
    res.render('index' , {
        component: "addChef",
        currentPage : 'ourChefs',
        categories,
    })
}

const addChef = async (req,res) => {
    const {name,experienceYears,type} = req.body;
    const image = req.file ? req.file.filename : 'uploads/default.jpg';
    try {
        const newChef = new Chef({
            name,
            experienceYears,
            image,
            type
        });

        await newChef.save();
        res.redirect('/chef');
    } catch (error) {
        console.error('Error adding chef item:', error);
        res.status(500).send('Internal Server Error');
    }
}

const editChefPage = async (req,res) => {
    const chef = await Chef.findById(req.params.id);
    res.render("index", {
        component: 'editChef',
        currentPage:'ourChefs',
        categories,
        chef,
    });
}
const editChef = async (req,res) => {
    const {name,experienceYears,type} = req.body;
    const chef = await Chef.findById(req.params.id);
    if (!chef) {
        return res.status(404).send('Chef is not found');
    }
    try {
        const updatedChef = await Chef.findByIdAndUpdate(req.params.id,
            {name,experienceYears,type,
                image : req.file ? req.file.filename : meal.image},
            { new: true });
        if (!updatedChef) {
            return res.status(404).send('Menu item not found');
        }
        res.redirect('/chef');
    } catch (error) {
        console.error('Error updating chef item:', error);
        res.status(500).send('Internal Server Error');
    }
}

const deleteChef = async (req,res) => {
    await Chef.findByIdAndDelete(req.params.id)
    res.redirect('/chef')
}


module.exports = {
    getAllChefs,
    getChef,
    addChefPage,
    addChef,
    editChefPage,
    editChef,
    deleteChef
}