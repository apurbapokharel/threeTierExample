const express = require('express');
const User = require('../modals/User');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.post('/', async(req,res) => {
    //checkusername repetition
    const usernameExists = await User.findOne({username: req.body.username});
    if (usernameExists) {
        return res.json(false);
    }
    //hash password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //make user
    const user= new User({
        username: req.body.username,
        password: hashPassword,
    });
    try{
        const savedUser = await user.save();
        res.json(true);
    }catch(err){
        res.json(false)
    };
});

module.exports = router;
