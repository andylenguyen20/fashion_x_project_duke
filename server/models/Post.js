const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schemas
const Post = new Schema({
    created_at: { type: Date, default: Date.now }
});

//notes for post
//filters: 1. ranges for weight (do a range query)

module.exports.Post = Post;