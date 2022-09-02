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

const port = process.env.PORT|| PORT;

mongoose.connect(MONGO_URI)
.then(()=>{console.log('Connect to MongoDB')})
.catch((err)=>{console.log(err)});

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}));
app.use('/api/user',user);
app.use('/api/AdultsBook',AdultsBook);
app.use('/api/KidsBook',KidsBook);


app.listen(port, ()=>{console.log("Connected to server of PORT :"+port)});

