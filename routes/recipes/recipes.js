
 const express = require("express");
 const router = express.Router();
 const Recipes = require("../../models/Recipe")

 router.get('/', (req, res) => {
    
    Recipes.find({})
    .then((recipe)=> {
      res.render("recipes/recipes", {recipe : recipe})
    })
    .catch(err => {
      console.log(err)
  });
})

module.exports = router;