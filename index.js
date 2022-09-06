const express = require("express");
const app = express();
const mongoose = require('mongoose');
const AdultsBook = require('./Routes/AdultsBook');
const KidsBook = require('./Routes/KidsBook');
const cors = require('cors');
const user = require('./Routes/user');
require('dotenv').config();
const  {MONGO_URI}  = process.env;
const {PORT} = process.env;
var session = require('express-session');
const passport = require("passport");
const admin = require('./Routes/admin')
const port = process.env.PORT|| PORT;

mongoose.connect(MONGO_URI)
.then(()=>{console.log('Connect to MongoDB')})
.catch((err)=>{console.log(err)});
app.use(session({
    secret: process.env.SESSION_SECRET,//session_ID
    resave: false,
    saveUninitialized: false
}))//middleware
app.use(passport.session());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
}));
app.use('/api/user',user);
app.use('/api/AdultsBook',AdultsBook);
app.use('/api/KidsBook',KidsBook);
app.use('/api/admin',admin)


app.listen(port, ()=>{console.log("Connected to server of PORT :"+port)});

