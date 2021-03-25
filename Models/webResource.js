
const mongoose = require("mongoose");

const webResource = new mongoose.Schema({
    keyword: String,
    webpreview: String,
    weblink: String,
    webdescription: String
}, {timestamps: true});

const webResourceModel = mongoose.model('webResources', webResource);

module.exports = webResourceModel;