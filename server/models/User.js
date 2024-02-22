// models/user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    salutation: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        min:1,
        required: true,
    },
    salutation: {
        type: String,
        required: true,
    },
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
