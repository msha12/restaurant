const express = require('express');
const router = express.Router();
const menuApi = require('../../controllers/api/menuController');

router.get('/', menuApi.getAllMenu);
router.get('/:id', menuApi.getMeal);

module.exports = router;
