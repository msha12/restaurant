const mongoose = require('mongoose')

const packageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  }, 
  details: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    default: 'uploads/default.jpg'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  fromDate: {
    type: Date,
    required: true
  },
  toDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
})

const Package = mongoose.model( 'Package', packageSchema)

module.exports = Package //package
