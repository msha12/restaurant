
const express = require('express')
const  router = express.Router()

const chefController = require('../controllers/chefController')
const upload = require('../config/multerConfig')

router.get('/' , chefController.getAllChefs)
router.get('/view/:id' , chefController.getChef)

router.get('/add' , chefController.addChefPage)
router.post('/add' ,upload.single('image'),chefController.addChef)

router.get('/edit/:id',chefController.editChefPage)
router.put('/:id',upload.single('image'),chefController.editChef)

router.delete('/:id',chefController.deleteChef)






module.exports = router