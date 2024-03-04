// models/Assignment.js
const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  details: {
    type: Object,
    required: true
  }
});

const assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = assignment;
