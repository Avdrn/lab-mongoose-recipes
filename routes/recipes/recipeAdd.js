const express = require("express");
const router = express.Router();
const Recipes = require("../../models/Recipe")

router.get('/', (req, res, next) => {
  res.render("recipes/recipeAdd");
});


router.post('/', (req, res, next) => {
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

module.exports = router;