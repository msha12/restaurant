
const Menu = require('../models/menuModel');
const categories = ['breakfast', 'lunch', 'dinner', 'dessert','drinks'];
const Chef = require('../models/chefModel');


const getChefNames = async () => {
  const result = await Chef.find({}, 'name');
  return result.map(c => c.name);
};


const getAllMenu = async (req,res) => {
    const page = parseInt(req.query.page) || 1; 
    const limit = 10; 
    const skip = (page - 1) * limit;

    const total = await Menu.countDocuments();
    
    const search = req.query.search || '';
    const query = search
        ? { 
            $or: [
            { name: { $regex: search, $options: 'i' } },
            { chef: { $regex: search, $options: 'i' } }
            ]
        }
        : {};
    
    let allMenu= await Menu.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);
    const totalPages = Math.ceil(total / limit);
    res.render('index',{
        component: "allMenu",
        allMenu,
        currentPage : 'ourMenu',
        searchPlace : 'menu',
        totalPages,
        page
    })
}

const getMeal = async (req, res) => {
    const meal = await Menu.findById(req.params.id)
    res.render('index',{
        component: "ShowMeal",
        meal,
        currentPage : 'ourMenu'
    })
}

const addItemPage = async (req,res) => {
    const chefs = await getChefNames();
    res.render('index',{
        component: 'newItem',
        currentPage:'ourMenu',
        categories,
        chefs,
    })
} 

const addItem = async (req,res) => {
    const { name, price, description, category, chef } = req.body;
    const image = req.file ? req.file.filename : 'uploads/default.jpg'; // Use uploaded image or default

    try {
        const newItem = new Menu({
            name,
            price,
            description,
            image,
            category,
            chef
        });

        await newItem.save();
        res.redirect('/menu');
    } catch (error) {
        console.error('Error adding menu item:', error);
        res.status(500).send('Internal Server Error');
    }
}


const editMealPage = async(req,res) => {
    const meal = await Menu.findById(req.params.id);
    const chefs = await getChefNames();
    res.render("index", {
        component: 'editMeal',
        currentPage:'ourMenu',
        categories,
        chefs,
        meal
    });
}

const editMeal = async (req,res) => {
    
    const { name, price, description, category, chef} = req.body;
    const meal = await Menu.findById(req.params.id)
    if (!meal) {
        return res.status(404).send('Menu item not found');
    }
    try {
        const updatedMeal = await Menu.findByIdAndUpdate(req.params.id,
            {name,price,description,category,chef,
                image : req.file ? req.file.filename : meal.image,
                isAvailable : req.body.isAvailable ? true : false},
            { new: true });
        if (!updatedMeal) {
            return res.status(404).send('Menu item not found');
        }
        res.redirect('/menu');
    } catch (error) {
        console.error('Error updating menu item:', error);
        res.status(500).send('Internal Server Error');
    }
}


const deleteMeal = async (req,res) => {
    await Menu.findByIdAndDelete(req.params.id)
    res.redirect('/menu')
}

module.exports ={
    getAllMenu,
    getMeal,
    addItem,
    addItemPage,
    editMealPage,
    editMeal,
    deleteMeal
}