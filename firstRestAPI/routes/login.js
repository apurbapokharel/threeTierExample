const express = require('express');
const User = require('../modals/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', async(req,res) => {
    //checkusername exists
    const user = await User.findOne({username: req.body.username});
    if (!user) {
        return res.json(false);
    }
    //check password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(! validPassword){
        return res.json(false);
    }
    //c8 jwt
    const token = jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        process.env.tokenPassword,
        { expiresIn: 1 * 10 },
    );
    res.header('token', token).json(true);
});



module.exports = router;
