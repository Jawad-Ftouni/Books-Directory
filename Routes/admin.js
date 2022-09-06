const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config()

router.get('/',async(req,res)=>{
    try{

        const barrierToken = req.headers.authorization?.split(' ');
    const token = barrierToken && barrierToken[0] === 'Bearer' ? barrierToken[1] : null;
    if(!barrierToken || !token){
        res.status(401).json({ message: 'unauthorized' });
        return;
    }

    const payload = jwt.verify(token,process.env.TOKEN_KEY);
    console.log(payload);
    res.json({message: 'welcome admin '+payload.userName});

    }catch(error){
        console.log(error)
        res.status(500).json({message:"my code sucks", error: error.message});
    }
})
module.exports = router;