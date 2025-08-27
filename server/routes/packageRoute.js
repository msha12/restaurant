const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const upload = require('../config/multerConfig');

// get all packages
router.get('/', packageController.getAllPackages)

router.get('/add', packageController.addPackagePage)

router.post('/add', upload.single('image'),packageController.addPackage)

router.get('/edit/:id',packageController.editPackagePage)
router.put('/:id', upload.single('image'),packageController.editPackage)

router.delete('/:id',packageController.deletePackage)

module.exports = router;