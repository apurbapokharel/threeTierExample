const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const token = req.body.token;
    if(!token) {
        return res.send('Access Denied');
    }
    try{
        const verified = jwt.verify(token, process.env.tokenpassword);
        // req.user = verified;
        // res.json(req.user);
        res.json(verified);
    }catch(error){
        res.send('Invalid or Expired Token');
    }
});

module.exports = router;
