const express = require('express');
const router = express.Router();
const Post = require('../model').Post;

// get all posts
router.get('/', (req, res, next) => {
    Post.find({}).sort({ createdAt: -1 }).exec((err, posts) => {
        if (err) return next(err);
        res.json(posts);
    });
});

module.exports = router;