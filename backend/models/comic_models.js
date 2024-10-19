const mongoose = require('mongoose');

const comicSchema= new mongoose.Schema({
    book:{
        type: String,
        required:false
    },
    author:{
        type: String,
        required:false
    },
    year:{
        type: Number,
        required:false
    },
    price:{
        type: Number,
        required:false
    },
    discount:{
        type: Number,
        required:false
    },
    pages:{
        type: Number,
        required:false
    },
    condition:{
        type: String,
        required:false
    },
    description:{
        type: String,
        required:false
    },
    comments:{
        type: String,
        required:false
    }

});

mongoose.model("ComicModel" , comicSchema)