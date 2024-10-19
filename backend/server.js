const express = require('express');
const PORT = 5000;
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

mongoose.connect("mongodb://127.0.0.1:27017/leaderboard");

mongoose.connection.on('connected', () => {
    console.log("DB connected");
})
mongoose.connection.on('error', (error) => {
    console.log("Some error while connecting to DB");
})

require('./models/comic_models');


app.use(cors());
app.use(express.json());

app.use(require('./routes/comic_routes'));

app.listen(PORT, () => {
    console.log("Server started");
});