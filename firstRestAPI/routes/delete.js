const express = require('express');
const Post = require('../modals/Modal');
const router = express.Router();

//DELETE
router.delete('/:postId', async(req,res) => {
    try {
        const post =  await Post.deleteOne({_id: req.params.postId});
        res.json(post);
    } catch (error) {
        res.json({message: error})
    }
    
});

module.exports = router;
