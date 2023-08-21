const uuidValidate = require('uuid-validate');
const axios = require('axios');
const {Recipe, Diet} = require('../db')

require('dotenv').config();
const {API_KEY, URL_RECIPE, URL_COMPLEX} = process.env;


const getRecipes = async (ID) => {
    const removeHtmlTags =(input) => {
        return input.replace(/<\/?[^>]+(>|$)/g, ""); 
    }
    try {
        if(uuidValidate(ID)){
        const dbRecipe = await Recipe.findByPk(ID);
            if(!dbRecipe){
                throw new Error('Recipe not found in API or database');
            }
            const relationrecipe = await Recipe.findOne({
                where: {id: dbRecipe.id},
                include:[{model :Diet, attributes: ["name"], through: {attributes: []}}]
            })
            const dietsArray = relationrecipe.diets.map(diet => diet.name);
            const updatedRecipe = {
                ...relationrecipe.toJSON(),
                diets: dietsArray
            };
            return updatedRecipe;
        }else{
            const {data} = await axios.get(`${URL_RECIPE}/${ID}/information?apiKey=${API_KEY}`)
        
            const {id,title,image,summary,healthScore, instructions, diets} = data;
            const recipe = {
                id,
                title,
                image,
                summary: removeHtmlTags(summary),
                healthScore,
                instructions: !instructions ? null : removeHtmlTags(instructions),
                diets
            }
            return recipe;
        }
    } catch (error) {
        throw new Error('Error fetching recipe: ' + error.message);
    }
}

const getRecipesTitle = async (name) => {

    const response = await axios.get(`${URL_COMPLEX}?apiKey=${API_KEY}&number=100`)
    if(!response.data){
        const dbRecipe = await Recipe.findOne({
            where:{name}
        })
        if(!dbRecipe) throw Error('Recipe not found') 
        return dbRecipe 
    }
    const result = response.data.results.find(
        (recipe) =>recipe.title.toLowerCase().split(" ")[0] === name.toLowerCase().split(" ")[0]);
    if(result) return result;
    
}

const getAllRecipes = async () => {
    const {data} = await axios.get(`${URL_COMPLEX}?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    const result = data.results;
    const recipes = result.map(({id,title,image,diets}) => (
        {id,title,image,diets}))
    return recipes;
}

const createRecipe = async (object, diets) => {
    
    const newRecipe = await Recipe.create(object);
    const dietFound = await Diet.findAll(
        {where:{
            name: diets}
        })
        
        await newRecipe.addDiet(dietFound);

        const relationrecipe = await Recipe.findOne({
            where: {id: newRecipe.id},
            include:[{model :Diet, attributes: ["name"], through: {attributes: []}}]
        })
        const dietsArray = relationrecipe.diets.map(diet => diet.name);

        const updatedRecipe = {
            ...relationrecipe.toJSON(),
            diets: dietsArray
        };

    return updatedRecipe;
}

module.exports = {
    getRecipes,
    getRecipesTitle,
    getAllRecipes,
    createRecipe
}