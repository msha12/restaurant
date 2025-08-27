const express = require('express');
const router = express.Router();

// Routers
const chefApiRouter = require('./chefRoute');
const menuApiRouter = require('./menuRoute');
const packageApiRouter = require('./packageRoute');

// Mount routes
router.use('/chefs', chefApiRouter);
router.use('/menu', menuApiRouter);
router.use('/packages', packageApiRouter);

module.exports = router;
