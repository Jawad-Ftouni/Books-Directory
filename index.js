const express = require("express");
const app = express();
const mongoose = require('mongoose');
const AdultsBook = require('./Routes/AdultsBook');
const KidsBook = require('./Routes/KidsBook');

mongoose.connect('mongodb://localhost/Books-directory')
.then(()=>{console.log('Connect to MongoDB')})
.catch((err)=>{console.log(err)});

app.use(express.json());

app.use('/api/AdultsBook',AdultsBook);
app.use('/api/KidsBook',KidsBook);


const PORT = 3000;
app.listen(PORT,()=>{console.log("Connected to server of PORT :"+PORT)});

