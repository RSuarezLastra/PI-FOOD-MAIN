const uuidValidate = require('uuid-validate');
const axios = require('axios');
const {Recipe, Diet} = require('../db')

require('dotenv').config();
const {API_KEY, URL_RECIPE, URL_COMPLEX, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6} = process.env;


const getRecipesId = async (ID) => {
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
                include:[{model :Diet, 
                        attributes: ["name"], 
                        through: {attributes: []}
                    }]
            })
            const dietsArray = relationrecipe.diets.map(diet => diet.name);
            const updatedRecipe = {
                ...relationrecipe.toJSON(),
                diets: dietsArray
            };
            return updatedRecipe;
        }else{
            const {data} = await axios.get(`${URL_RECIPE}/${ID}/information?apiKey=${API_KEY2}`)
        
            const {id,title,image,summary,healthScore, analyzedInstructions, diets} = data;
            const steps = analyzedInstructions.map(({steps})=> {
                return steps.map((obj)=>obj.step)
            })
            const recipe = {
                id,
                title,
                image,
                summary: removeHtmlTags(summary),
                healthScore,
                steps,
                diets
            }
            return recipe;
        }
    } catch (error) {
        throw new Error('Error fetching recipe: ' + error.message);
    }
}

const getRecipesTitle = async (name) => {

    const response = await axios.get(`${URL_COMPLEX}?apiKey=${API_KEY2}&addRecipeInformation=true&number=100`)
    const result = response.data.results.filter(
        (recipe) =>recipe.title.toLowerCase().split(" ")[0] === name.toLowerCase().split(" ")[0]);

    if(!result.length){
        const dbRecipe = await Recipe.findOne({
            where:{title: name},
            include:[{model :Diet, 
                attributes: ["name"], 
                through: {attributes: []}
            }]
        })
        console.log(dbRecipe)
        if(!dbRecipe) throw Error('Recipe not found')

        const dietsArray = dbRecipe.diets.map(diet => diet.name);
        const updatedRecipe = {
            ...dbRecipe.toJSON(),
            diets: dietsArray
        };
        return updatedRecipe; 
    }

    const recipe = result.map(({id,title,image, diets})=>({id,title,image,diets}))
    if(recipe) return recipe;
}

const getAllRecipes = async () => {
    const dbRecipes = await Recipe.findAll({
        include:[{model: Diet,
                attributes:["name"],
                through:{attributes:[]}
        }]
    });
    const {data} = await axios.get(`${URL_COMPLEX}?apiKey=${API_KEY2}&addRecipeInformation=true&number=100`)
    const result = data.results;

    const apiRecipes = result.map(({id,title,image,diets, vegetarian, healthScore}) => {
        if(vegetarian) diets.unshift("vegetarian")
        return {id,title,image,diets, healthScore}
    })

    const transformedDbRecipes = dbRecipes.map(recipe => ({
        ...recipe.toJSON(),
        diets: recipe.diets.map(diet => diet.name)
    }));    

    const allRecipes = transformedDbRecipes.concat(apiRecipes)
    return allRecipes;
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
    getRecipesId,
    getRecipesTitle,
    getAllRecipes,
    createRecipe
}