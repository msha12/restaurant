const Reservation = require('../models/reservationModel');


const getAllReservations = async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const limit = 10; 
    const skip = (page - 1) * limit;

    const total = await Reservation.countDocuments();
    
    const search = req.query.search || '';
    const query = search ? { $or: [ { name: { $regex: search, $options: 'i' } } ] } : {};
    
    const allReservations = await Reservation.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);
    const totalPages = Math.ceil(total / limit);
    
    res.render('index', {
        component: "allReservations",
        allReservations,
        currentPage : 'ourReservation',
        totalPages,
        page,
        searchPlace : 'reservation',
        
    });
}

const addReservationPage = async (req,res) => {
    
    res.render('index' , {
        component: "addReservation",
        currentPage : 'ourReservation',
        
    })
}

const addReservation = async (req, res) => {

    
    try {
        const savedReservation = await Reservation.create({...req.body})
        res.redirect('/reservation');
    } catch (error) {
        res.status(400).json({ message: 'Error adding reservation', error: error.message });
    }
}

const editReservationPage = async(req,res) => {
    
    const reservation = await Reservation.findById(req.params.id);
    res.render("index", {
        component: 'editReservation',
        currentPage:'ourReservation',
        reservation,
        
    });
}

const editReservation = async (req,res) => {

    const reservation = await Reservation.findById(req.params.id)
    if (!reservation) {
        return res.status(404).send('reservation is not found');
    }
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, {...req.body});
        if (!updatedReservation) {
            return res.status(404).send('reservation item not found');
        }
        res.redirect('/reservation');
    } catch (error) {
        console.error('Error updating reservation item:', error);
        res.status(500).send('Internal Server Error');
    }
}

const deleteReservation = async(req,res) => {
    await Reservation.findByIdAndDelete(req.params.id)
    res.redirect('/reservation')
}


module.exports = {
    getAllReservations,
    addReservationPage,
    addReservation,
    editReservationPage,
    editReservation,
    deleteReservation
};
