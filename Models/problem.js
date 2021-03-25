const mongoose = require("mongoose");

const Problem = new mongoose.Schema({
    problem: String,
    description: String,
    solution: String,
    attempts: Number,
}, {timestamps: true});

const problemModel = mongoose.model('problems', Problem);

module.exports = problemModel;