const express = require("express");
const router = express.Router();
const Recipes = require("../../models/Recipe")


router.get('/:id', (req, res, next) => {
  Recipes.findById(req.params.id)
  .then((recipe) => {
  res.render("recipes/recipe", {recipe});
})
  .catch((error) => {
    console.log(error);
  })
});

module.exports = router;