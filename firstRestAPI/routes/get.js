const express = require('express');
const Post = require('../modals/Modal');
const router = express.Router();

//GET request
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
     //    const posts = await Post.find({title: 'Entry2'}).exec();
        res.json(posts);
    } catch (error) {
        res.json({message: error});
    }
 });

//SEARCH AND RETURN
router.get('/:postId', async(req,res) => {
    try {
        const post =  await Post.findById(req.params.postId);
        res.json(post);
    } catch (error) {
        // res.json({message: false});
        res.json(null); 
    }
    
});

module.exports = router;
