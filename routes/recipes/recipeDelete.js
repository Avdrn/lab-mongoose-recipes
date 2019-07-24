
const express = require("express");
const router = express.Router();
const Recipes = require("../../models/Recipe")
const mongoose = require("mongoose");



router.get('/:id', (req, res, next) => {
  Recipes.findOneAndRemove(req.query.recipe_id)
  .then((recipe) => {
    console.log(recipe)
    res.redirect('/recipes');  
  })
  .catch((error) => {
    console.log(error);
  })
});


module.exports = router;

