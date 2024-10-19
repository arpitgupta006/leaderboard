const express = require('express');

const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const ComicModel = mongoose.model("ComicModel");
const bodyparser = require('body-parser');
const { ObjectId } = require('mongodb');

/*assuming an express app is declared here*/
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

router.post("/addcomic",  (req, res) => {
    const { book, author, year , price , discount , pages , condition , description , comments } = req.body;
    if (!book || !author || !year) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
   
    const comicObj = new ComicModel({ book: book, author: author, year: year , price : price , discount: discount
        , pages : pages , condition : condition , description : description , comments : comments});
    comicObj.save()
        .then((newComic) => {
            res.status(201).json({ comic: newComic });
        })
        .catch((error) => {
            console.log(error);
        })
});

router.get("/getcomics", (req, res) => {
    ComicModel.find()       
        .then((dbComics) => {
            res.status(200).json({ comics: dbComics })
        })
        .catch((error) => {
            console.log(error);
        })
});

router.delete("/deletecomic/:comicId",  (req, res) => {
    ComicModel.findOne({ _id: req.params.comicId })
        .populate("_id")
        .exec((error, comicFound) => {
            if (error || !comicFound) {
                return res.status(400).json({ error: "Comic does not exist" });
            }
            
                comicFound.remove()
                    .then((data) => {
                        res.status(200).json({ result: data });
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            
        })
});

router.patch("/editcomic/:comicId",  (req, res) => {
   const updates = req.body

   if(ObjectId.isValid(req.params.comicId)){
    db.collection('leaderboard')
    .updateOne({_id:ObjectId(req.params.comicId)} , {$set:updates})
    .then(result =>{
        res.status(200).json(result)
    })
    .catch(err =>{
        res.status(500).json({error: 'Can not update'})
    })
   } else {
    res.status(500).json({error: 'Can not find the book'})
   }
});


module.exports = router;