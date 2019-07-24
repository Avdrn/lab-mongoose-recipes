const express = require("express");
const router = express.Router();
const Recipes = require("../../models/Recipe")
 
router.get('/', (req, res, next) => {
  Recipes.findById(req.query.recipe_id)
  .then((recipe) => {
    res.render("recipes/recipeEdit", {recipe});
  })
  .catch((error) => {
    console.log(error);
  })
});

router.post('/', (req, res, next) => {
  const { title, level, ingredients, cuisine, dishType} = req.body;
  Recipes.findByIdAndUpdate(req.query.recipe_id, { title, level, ingredients, cuisine, dishType})
    .then((recipe) => {
      res.redirect('/recipes');
    })
    .catch((error) => {
      console.log(error);
    })
});

module.exports = router;