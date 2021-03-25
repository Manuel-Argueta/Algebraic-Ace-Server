const mongoose = require("mongoose");

const User = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    userPosts: Array,
    xp: Number,
    streak: Number
}, {timestamps: true});

const userModel = mongoose.model('users', User);

module.exports = userModel;