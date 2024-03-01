// models/CollegeDetails.js
const mongoose = require('mongoose');

const collegeDetailsSchema = new mongoose.Schema({
  totalStrength: {
    type: Number,
    required: true
  },
  branches: {
    type: [String],
    required: true
  },
  rooms: {
    type: [String],
    required: true
  }
});

const CollegeDetails = mongoose.model('CollegeDetails', collegeDetailsSchema);

module.exports = CollegeDetails;
