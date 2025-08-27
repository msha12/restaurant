const express = require('express');
const router = express.Router();
const chefApi = require('../../controllers/api/chefController');

router.get('/', chefApi.getAllChefs);
router.get('/:id', chefApi.getChef);

module.exports = router;
