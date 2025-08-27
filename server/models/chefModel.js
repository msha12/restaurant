const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
  },
  experienceYears: {
    type: Number,
    required: true,
    min: 0
  },
  type: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'dessert', 'drinks'],
    required: true
  }
}, { timestamps: true });

const Chef = mongoose.model('Chef', chefSchema);

module.exports = Chef;
