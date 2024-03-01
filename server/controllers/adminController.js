// controllers/adminController.js
const User = require('../models/User');
const CollegeDetails = require('../models/CollegeDetails');


const addFaculty = async (req, res) => {
    try {
        const { salutation, name, id, email, password, timetable } = req.body;

        // Create a new user
        const newUser = new User({
            salutation,
            name,
            id,
            email,
            password,
            timetable,
        });

        // Save the user to the database
        await newUser.save();

        res.status(200).json({ message: 'Faculty added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getFacultyDetails = async (req, res) => {
    try {
        // Fetch faculty details from the database
        const facultyDetails = await User.find({ salutation: { $exists: true } }, { _id: 0, __v: 0 });

        res.status(200).json({ message: 'Faculty details fetched successfully', details: facultyDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addOrUpdateCollegeDetails = async (req, res) => {
    try {
        const { totalStrength, branches , rooms } = req.body;

        // Check if college details already exist
        const existingDetails = await CollegeDetails.findOne();
        if (existingDetails) {
            // If details exist, update the record
            existingDetails.totalStrength = totalStrength;
            existingDetails.branches = branches;
            existingDetails.rooms = rooms;
            await existingDetails.save();
            res.status(200).json({ message: 'College details updated successfully' });
        } else {
            // If details don't exist, create a new record
            const newDetails = new CollegeDetails({ totalStrength, branches ,rooms });
            await newDetails.save();
            res.status(200).json({ message: 'College details added successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getCollegeDetails = async (req, res) => {
    try {
        const collegeDetails = await CollegeDetails.findOne(); 
        res.status(200).json({ collegeDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getCFacultyDetails = async (req, res) => {
    try {
        const facultyDetails = await User.find({}, { _id: 0, email: 1, name: 1,timetable: 1,salutation : 1 }); // Fetching only email and name
        res.status(200).json({ facultyDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = { addFaculty, getFacultyDetails, getCollegeDetails, getCFacultyDetails, addOrUpdateCollegeDetails };