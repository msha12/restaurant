
const mongoose = require('mongoose');


const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        default: 'uploads/default.jpg' // Assuming a default image if none is provided
    },
    category: {
        type: String,
        required: true,
        enum: ['breakfast', 'lunch', 'dinner', 'dessert','drinks'],
        trim: true
    },
    chef: {
        type: String,
        required: true,
        enum: ['chef1', 'chef2', 'chef3', 'chef4'],
        trim: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}); 

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;