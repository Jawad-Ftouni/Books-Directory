const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');


const userschema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"user name required"],
        unique:[true,"username already exist"]
    },
    pwd:{
        type:String,
        required:[true,"password required"]
    }
})

const User = mongoose.model("User",userschema);

router.post('/', async(req,res)=>{
    const user = new User({
        userName: req.body.userName,
        pwd: req.body.pwd
    })
    if(!user)
    console.log('user')
    const result = await user.save();
    console.log(result);
    res.send(user);
})

router.get('/',async(req,res)=>{
    const users =  await User.find();
    if(!users)
    console.log("no users found")
    res.send(users);
})

module.exports = router;