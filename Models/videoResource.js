const mongoose = require("mongoose");

const videoResource = new mongoose.Schema({
    keyword: String,
    videolink: String,
    videodescription: String
}, {timestamps: true});

const videoResourceModel = mongoose.model('videoResources', videoResource);

module.exports = videoResourceModel;