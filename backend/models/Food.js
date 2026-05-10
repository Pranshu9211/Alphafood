const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a food name'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Pizza', 'Burger', 'Drinks', 'Desserts', 'Indian Food', 'Fast Food']
  },
  description: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Food', foodSchema);
