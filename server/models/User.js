// models/user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        max: 60,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    timetable: {
        type: Object,
        required: true,
    },
});

module.exports = mongoose.model('Users', userSchema);
