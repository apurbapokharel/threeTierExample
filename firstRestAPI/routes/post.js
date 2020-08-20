const express = require('express');
const Post = require('../modals/Modal');

const router = express.Router();

// //GET request
// router.get('/', async (req, res) => {
//    try {
//        const posts = await Post.find();
//     //    const posts = await Post.find({title: 'Entry2'}).exec();
//        res.json(posts);
//    } catch (error) {
//        res.json({message: error});
//    }
// });

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

// //SEARCH AND RETURN
// router.get('/:postId', async(req,res) => {
//     try {
//         const post =  await Post.findById(req.params.postId);
//         res.json(post);
//     } catch (error) {
//         res.json({message: error})
//     }
    
// });

// //DELETE
// router.delete('/:postId', async(req,res) => {
//     try {
//         const post =  await Post.deleteOne({_id: req.params.postId});
//         res.json(post);
//     } catch (error) {
//         res.json({message: error})
//     }
    
// });

// //UPDATE
// router.patch('/:postId', async(req,res) => {
//     try {
//         const post =  await Post.updateOne({_id: req.params.postId}, { $set: {title: req.body.title}});
//         res.json(post);
//     } catch (error) {
//         res.json({message: error})
//     }
    
// });

module.exports = router;
