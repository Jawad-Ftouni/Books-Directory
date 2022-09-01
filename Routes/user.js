const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local');
const passport = require('passport');

passport.use(new LocalStrategy((userName,pwd,done)=>{

    User.findOne({userName: userName},(err, user)=>{
        if(err){ return done(err); }
        if(!user){ return done(null, false) }
        if(!user.verifyPassword(pwd)) {return done(null,false);}
        return done(null, user)
    })

}))

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

router.post('/login', async(req,res)=>{
passport.authenticate('local',{ failureRedirect: 'login' }),(req,res)=>{
    res.redirect('/');
}

})
router.post('/register', async(req,res)=>{

    


     user = new User({
        userName: req.body.userName,
        pwd: req.body.pwd
     });

    if(!user)
    console.log('user')
     await user.save();
    res.send(user);
})


router.get('/',async(req,res)=>{
    const users =  await User.find();
    if(!users)
    console.log("no users found")
    res.send(users);
})

module.exports = router;