const express = require('express');
const User = require('../modals/User');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.patch('/:username', async(req,res) => {
    //checkusername exists
    const user = await User.findOne({username: req.params.username});
    if (!user) {
        return res.json('Username invalid');
    }
    try {
        const userUpdate =  await User.updateOne({username: req.params.username}, { $set: {isAdmin: true}});
        res.json(userUpdate);
    } catch (error) {
        res.json({message: error})
    }
});

module.exports = router;
