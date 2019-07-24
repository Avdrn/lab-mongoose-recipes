const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require ("body-parser")

app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const Schema = mongoose.Schema;

const Movie = mongoose.model('movies', new Schema({
    title: String,
    director: String,
    stars: Array,
    image: String,
    description: String,
    showtimes : Array,
}), "movies");

mongoose.connect('mongodb://localhost/movie', {useNewUrlParser: true}, (err)=> {
    debugger
    if(err) console.log("ERROR EROROROR", err)
    else console.log("connected")
});


app.use(express.static(__dirname + '/public'));

app.get("/movies",(req,res)=> {
    Movie.find({})
        .then((movies)=> {
            res.render("movies.hbs", {movies: movies})
        })
        .catch(err => {
            console.log(err)
        })
})
app.get("/",(req,res)=> {
    res.render("home.hbs") 
})
app.get("/movies",(req,res)=> {
    res.render("movies.hbs") 
})

app.get("/movie",(req,res)=> {
    const movieId = req.query.id;
    Movie.findById(movieId, function(err, adventure){})
        .then((movie)=> {
            res.render("movie.hbs", {movie: movie})
        })
        .catch(err => {
            console.log(err)
})})

app.listen(3000, ()=> {
    console.log("App listening")
})