const express = require('express');
const Post = require('../modals/Modal');

const router = express.Router();

//POST
router.post('/', async(req,res) => {
    const post= new Post({
        title: req.body.title,
        description: req.body.description,
    });
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    }catch(err){
        res.json({message: err})
    };
});

module.exports = router;
