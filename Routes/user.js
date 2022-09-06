const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcrypt');
// const flash = require('connect-flash');
const LocalStrategy = require('passport-local');
const session = require('express-session');
require('dotenv').config()
const app = express();
const jwt = require('jsonwebtoken');
const compareHash = require('../middleware/compareHashPwd');
passport.serializeUser((user, done)=>done(null,user));//write or save user into a session
passport.deserializeUser((user, done)=>done(null,user));// read user from a session  

// app.use(flash());//middleware
app.use(session({
    secret: process.env.SESSION_SECRET,//session_ID
    resave: false,
    saveUninitialized: false
}))//middleware
app.use(passport.initialize())//initialize passport and connect it to express servers
app.use(passport.session())//middleware



const userschema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"user name required"],
        unique:[true,"username already exist"]
    },
    password:{
        type:String,
        required:[true,"password required"]
    },

})

const User = mongoose.model("User",userschema);

passport.use(new LocalStrategy.Strategy({usernameField: 'userName',session:true},
  async(userName, password, done)=>{
    try{
        const userFound = await User.findOne({userName: userName});
        if(!userFound){console.log("user not found")}
        if(userFound && compareHash(password,userFound.password)){
          done(null, userFound);
          }else {
            done(null, false,{message:'user doesnt exist'});//status 401 text of unauthorized message isnt working
          }
        
    }catch(error) {
      done(error);
    }
   
  }
));



router.post('/register',async(req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        
        const user = new User({
            userName: req.body.userName,
            password: hashedPassword
        })
        await user.save();
        res.send(user)
        console.log(user)
    } catch(error){
        console.log(error)
    }
})





router.post('/login',passport.authenticate('local') ,async(req,res)=>{
  try{
     const token = jwt.sign(
            { user_id: req.user.id, userName:req.user.userName, role:1 },
            process.env.TOKEN_KEY,
            {expiresIn: '15d'}
          );
     res.json(token);
  } catch(error){
    console.log(error);
    res.status(500).json({message: 'my code sucks, let me know!' })
  }


});

router.get('/',async(req,res)=>{
    const users =  await User.find();
    if(!users)
    console.log("no users found")
    res.send(users);
})

router.delete('/',async(req,res)=>{
  const result = await User.deleteMany();
  if(!result)res.send("cant delete users");
      res.send(result);
  
})

module.exports = router;
