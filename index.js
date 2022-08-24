const express = require("express");
const app = express();
const mongoose = require('mongoose');
const AdultsBook = require('./Routes/AdultsBook');
const KidsBook = require('./Routes/KidsBook');
const cors = require('cors');


mongoose.connect('mongodb://localhost/Books-directory')
.then(()=>{console.log('Connect to MongoDB')})
.catch((err)=>{console.log(err)});

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}));
app.use('/api/AdultsBook',AdultsBook);
app.use('/api/KidsBook',KidsBook);


const PORT = 3001;
app.listen(PORT,()=>{console.log("Connected to server of PORT :"+PORT)});

