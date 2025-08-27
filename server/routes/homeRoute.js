const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/verifyToken')
const homeController = require('../controllers/homeController');


router.get('/',verifyToken,homeController.dashboardHome)



module.exports = router