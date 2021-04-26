const mongoose = require('mongoose');

const DrinkSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  brand: {
    type: String,
    required: true
  },
  img: {
    type: String,
  },
  country: {
    type: String,
  },
  region: {
    type: String,
  },
  abv: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  subtype1: {
    type: String,
  },
  subtype2: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('drink',DrinkSchema);
