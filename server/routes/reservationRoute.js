const express = require('express');
const router = express.Router();

const reservationController = require('../controllers/reservationController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/' ,reservationController.getAllReservations)

router.get('/add' ,reservationController.addReservationPage)

router.post('/add' ,reservationController.addReservation)

router.get('/edit/:id',reservationController.editReservationPage)

router.put('/:id', reservationController.editReservation)

router.delete('/:id' ,reservationController.deleteReservation)



module.exports = router