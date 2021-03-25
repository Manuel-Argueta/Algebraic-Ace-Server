const mongoose = require("mongoose");

const Post = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
    likes: Number
}, {timestamps: true});

const postModel = mongoose.model('posts', Post);

module.exports = postModel;