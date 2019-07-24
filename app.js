const mongoose = require('mongoose');
// const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'
const express = require("express");
const app = express();
const bodyParser = require ("body-parser");

app.use(bodyParser.urlencoded({extended:false}));

// Connection to the database "recipeApp"
app.set ("view engine", "hbs");
app.use(express.static("public"));

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
  
app.use("/", require("./routes/home"))
app.use("/recipes", require("./routes/recipes/recipes"))
app.use("/recipe", require("./routes/recipes/recipe"))
app.use("/recipeAdd", require("./routes/recipes/recipeAdd"))
app.use("/recipeEdit", require("./routes/recipes/recipeEdit"))
app.use("/recipeDelete", require("./routes/recipes/recipeDelete"))
app.use("/signup", require("./routes/users/signup"))

app.listen(3000, ()=> {
console.log("app listening")
})