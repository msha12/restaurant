const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/verifyToken')
const menuController = require('../controllers/menuController');

const upload = require('../config/multerConfig')

router.get('/',menuController.getAllMenu)
router.get('/view/:id',menuController.getMeal)

router.get('/add',menuController.addItemPage)
router.post('/addItem',upload.single('image'),verifyToken,menuController.addItem)


router.get('/edit/:id',menuController.editMealPage)
router.put('/:id',upload.single('image'),menuController.editMeal)

router.get('/delete/:id/',menuController.deleteMeal)



module.exports = router