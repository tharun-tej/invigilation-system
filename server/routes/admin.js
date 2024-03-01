// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
router.post('/add-faculty', adminController.addFaculty);
router.get('/getFacultyDetails', adminController.getFacultyDetails)
router.post('/addOrUpdateCollegeDetails', adminController.addOrUpdateCollegeDetails);
router.get('/college-details', adminController.getCollegeDetails);
router.get('/faculty-details', adminController.getFacultyDetails);
module.exports = router;
