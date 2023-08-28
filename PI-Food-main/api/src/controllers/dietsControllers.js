const axios = require('axios');
const { Diet } = require('../db');

require('dotenv').config();
const {API_KEY, URL_COMPLEX, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6} = process.env;

const getDiets = async () => {

    const dbDiets = await Diet.findAll();
    if(!dbDiets.length){
        let dietTypes = [];
        const response = await axios.get(`${URL_COMPLEX}?apiKey=${API_KEY6}&addRecipeInformation=true&number=100`)

        const {results} = response.data;
        for (const props of results) {
            if(props.vegetarian === true){
                if(dietTypes.length < 1) dietTypes.push("vegetarian")
            }
        }
        const Arraydiets = results.map((recipes)=> recipes.diets)
        if(Arraydiets.length) {
            for (const array of Arraydiets) {
                for (const diet of array) {
                    if(!dietTypes.includes(diet)){
                        dietTypes.push(diet)
                    }
                }
            }
        }
        if(dietTypes.length){
            await Diet.bulkCreate(dietTypes.map(diet => ({ name: diet })));
        } 
        return dietTypes;
    }
    
    return dbDiets.map((element)=>element.name)
}

module.exports = getDiets;
