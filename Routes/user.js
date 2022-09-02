const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');
const session = require('express-session');
const initializePassport = require('../passport-config')

router.use(flash());
router.use(session({
    secret: process.env.SESSION_SECRET,
    rasave: false,
    saveUninitialized: false
}))

router.use(passport.initialize())
router.use(passport.session())

initializePassport(
    passport,
    (userName) => {
    return User.find(user => user.userName === userName)
})



const userschema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"user name required"],
        unique:[true,"username already exist"]
    },
    pwd:{
        type:String,
        required:[true,"password required"]
    },
      token: { type: String }

})

const User = mongoose.model("User",userschema);

router.post('/register',async(req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.pwd, 10)
        
        const user = new User({
            userName: req.body.userName,
            pwd: hashedPassword
        })
        res.redirect('/login')
    } catch{
        res.redirect('/register')
    }
})

router.post('/login',passport.authenticate('local',{
    successRedirect: '/',
    failerRedirect: 'login',
    failerFlash: true
}))


router.get('/',async(req,res)=>{
    const users =  await User.find();
    if(!users)
    console.log("no users found")
    res.send(users);
})

module.exports = mongoose.model("user", userschema);
