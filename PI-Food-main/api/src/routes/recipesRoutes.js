const {getRecipesById, getRecipesByName, postNewRecipes} = require('../handlers/recipesHandlers');
const recipeRoute = require('express').Router();

recipeRoute.get('/:id',getRecipesById);
recipeRoute.get('/',getRecipesByName);
recipeRoute.post('/',postNewRecipes);

module.exports = recipeRoute;
