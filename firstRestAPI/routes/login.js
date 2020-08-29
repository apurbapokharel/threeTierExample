const express = require('express');
const User = require('../modals/User');
const router = express.Router();
const bcrypt = require('bcryptjs');

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
    res.json(true);
});



module.exports = router;
