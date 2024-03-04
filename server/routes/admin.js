// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
router.post('/add-faculty', adminController.addFaculty);
router.get('/getFacultyDetails', adminController.getFacultyDetails)
router.post('/addOrUpdateCollegeDetails', adminController.addOrUpdateCollegeDetails);
router.get('/getCollegeDetails', adminController.getCollegeDetails);
router.get('/getCFacultyDetails', adminController.getCFacultyDetails);
router.post('/postAssignment',adminController.postAssignment);
router.get('/getAssignmentDetails',adminController.getAssignmentDetails);
module.exports = router;
