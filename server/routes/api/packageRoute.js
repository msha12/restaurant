const express = require('express');
const router = express.Router();
const packageApi = require('../../controllers/api/packageController');

router.get('/', packageApi.getAllPackages);
router.get('/:id', packageApi.getPackage);

module.exports = router;
