
const mongoose = require("mongoose");
const Schema   = mongoose.Schema; 
const recipeSchema = new Schema({
  title: String,
  level: String,
  ingredients: Array,
  cuisine: String,
  dishType: String,
  });

const Recipes = mongoose.model('recipes', recipeSchema) // model(collecyionName, shema à suivre)

module.exports = Recipes;
