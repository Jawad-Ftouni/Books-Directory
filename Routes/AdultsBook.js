const express = require('express');
const mongoose= require('mongoose');
const router = express.Router();


const BooksSchema = new mongoose.Schema({
    book_Name:{
        type: String,
    },
    language: {
        type:String,
		
    },
    author: String,
    release_date:{
        type: Date,
    },

   
    price: {
        type: Number,
    }

})
const Book = mongoose.model("AdultsBook", BooksSchema);

router.post('/', async(req,res) =>   {
   const Book1 = new Book({
	   book_Name: req.body.book_Name,
        language: req.body.language,
        author: req.body.author,
        release_date: Date.now(),
        price: req.body.price

    })
    const result = await Book1.save();
    if(!result)
    return res.send('Books not added') ;   
    console.log(Book1);
   return res.send(Book1);
})

router.put('/:id', async(req,res)=>{
    console.log("in")
    console.log(req.body.price)
    const Book1 = await Book.findByIdAndUpdate(req.params.id,{
        language: req.body.language,
        author: req.body.author,
        book_Name: req.body.book_Name,
        release_date: req.body.release_date,
        price: req.body.price
    });
    console.log(req.params.id);
    if(!Book1)
    res.status(404).send("id doesnt exist");
    res.send(Book1);

    
})
router.get('/',async(req,res)=>{
    const Books =  await Book.find();
    if(!Books)
    res.status(404).send('no Books found');
    // console.log(Books);
    res.send(Books);
})
router.get('/:id',async(req,res)=>{
    const book = await Book.findById(req.params.id);
    if(!book)
    res.status(404).send("Book not Found")
    res.send(book);
})
router.delete('/:id',async(req,res)=>{
    const Book1 = await Book.findByIdAndDelete(req.params.id);
    if(!Book1)
    res.status.send('cant delete Book');
    res.send(Book1);
})
router.delete('/',async(req,res)=>{
    let result = await Book.deleteMany();
    if(!result)
    res.send("cant delete");
    res.send(result);
})



module.exports = router;