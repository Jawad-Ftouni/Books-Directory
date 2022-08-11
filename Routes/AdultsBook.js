const express = require('express');
const mongoose= require('mongoose');
const router = express.Router();


const BooksSchema = new mongoose.Schema({
    Book_Name:{
        type: String,
        required: true
    },
    language: {
        type:String,
        required: ["English", "Arabic"]
    },
    author: String,
    release_date:{
        type: Date,
        required: true
    },
    cover_color: String,
    available: {
        type: Boolean,
        required: true
    },
   
    Price: {
        type: Number,
        required: true
    }

})
const Book = mongoose.model("AdultsBook", BooksSchema);

router.post('/', async(req,res) =>   {
   const Book1 = new Book({
        language: req.body.language,
        author: req.body.author,
        release_date: Date.now(),
        cover_color: req.body.cover_color,
        available: req.body.available,
        price: req.body.price

    })
    const result = await Book1.save();
    if(!result)
    return res.send('Books not added') ;   

   return res.send(Book1);
})

router.put('/:id', async(req,res)=>{
    const Book1 = await Book.updateOne(req.param.id,{
        language: req.body.language,
        author: req.body.author,
        release_date: req.body.release_date,
        cover_color: req.body.cover_color,
        available: req.body.available,
        price: req.body.price
    });
    if(!Book1)
    res.status(404).send("id doesnt exist");
    res.send(Book1);

    
})
router.get('/',async(req,res)=>{
    const Books =  await Book.find();
    if(!Books)
    res.status(404).send('no Books found');
    console.log(Books);
    res.send(Books);
})
router.delete('/:id',async(req,res)=>{
    const Book1 = await Book.deleteOne(req.param.id);
    if(!Book1)
    res.status.send('cant delete Book');
    res.send(Book1);
})




module.exports = router;