const express = require('express');
const Post = require('../modals/Modal');
const router = express.Router();

//UPDATE
router.patch('/:postId', async(req,res) => {
    try {
        const post =  await Post.updateOne({_id: req.params.postId}, { $set: {title: req.body.title, description: req.body.description}});
        res.json(post);
    } catch (error) {
        res.json({message: error})
    }
    
});

module.exports = router;
