// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, default: '' },
    mobileNumber: { type: String, default: '' },
    socialLinks: { type: [String], default: [] },
    city: { type: String, default: '' },
    profilePhoto: { type: String, default: '' },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
