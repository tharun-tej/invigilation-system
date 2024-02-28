// controllers/adminController.js
const User = require('../models/User');

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

const getFaultyDetails = async (req, res) => {
    try {
        // Fetch faculty details from the database
        const facultyDetails = await User.find({ salutation: { $exists: true } }, { _id: 0, __v: 0 });

        res.status(200).json({ message: 'Faculty details fetched successfully', details: facultyDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { addFaculty, getFaultyDetails };
