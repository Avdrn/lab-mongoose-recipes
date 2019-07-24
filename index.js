const mongoose = require('mongoose');
// const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'
const express = require("express");
const app = express();
const router = express();
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

  const Schema = mongoose.Schema;
  const recipeSchema = new Schema({
    title: String,
    level: String,
    ingredients: Array,
    cuisine: String,
    dishType: String,
    });

const Recipes = mongoose.model('Recipe', recipeSchema)

module.exports = Recipes;


  app.get('/', (req, res) => {
    res.render("home");
  });

  app.get('/recipeAdd', (req, res, next) => {
    res.render("recipeAdd");
  });

  app.get('/recipe/edit', (req, res, next) => {
    Recipes.findById(req.query.recipe_id)
    .then((recipe) => {
      debugger
      res.render("recipe-edit", {recipe});
    })
    .catch((error) => {
      console.log(error);
    })
  });

  app.post('/recipe/edit', (req, res, next) => {
    const { title, level, ingredients, cuisine, dishType} = req.body;
    Recipes.findByIdAndUpdate(req.query.recipe_id, { title, level, ingredients, cuisine, dishType})
      .then((recipe) => {
        res.redirect('/recipes');
      })
      .catch((error) => {
        console.log(error);
      })
  });

  app.get('/recipes', (req, res) => {
    debugger
    Recipes.find({})
    .then((recipes)=> {
      debugger
      res.render("recipes", {recipes : recipes})
    })
    .catch(err => {
      console.log(err)
  });
})

  

  app.post('/recipeAdd', (req, res, next) => {
    const { title, level, ingredients, cuisine, dishType} = req.body;

    const newRecipe = new Recipes({ title, level, ingredients, cuisine, dishType});
    
    newRecipe.save()
      .then((recipe) => {
        res.redirect('/recipes');
      })
      .catch((error) => {
        console.log(error);
      })
  });


  app.listen(3000, ()=> {
    console.log("app listening")
  })