// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
// Define routes
router.post('/add-faculty', adminController.addFaculty);
router.get('/getFacultyDetails', adminController.getFaultyDetails)
module.exports = router;
