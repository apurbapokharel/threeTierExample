const express = require('express');
const User = require('../modals/User');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.patch('/', async(req,res) => {
    //checkusername exists
    const user = await User.findOne({username: req.body.username});
    if (!user) {
        return res.json('Username invalid');
    }
    if (user.isAdmin == req.body.isAdmin){
        return res.json('No need to update user');
    }
    try {
        const userUpdate =  await User.updateOne({username: req.body.username}, { $set: {isAdmin: req.body.isAdmin}});
        res.json(userUpdate);
    } catch (error) {
        res.json({message: error})
    }
});

module.exports = router;
