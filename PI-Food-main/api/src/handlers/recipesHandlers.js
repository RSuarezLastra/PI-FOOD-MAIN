const {getRecipesId , getRecipesTitle,getAllRecipes, createRecipe } = require('../controllers/recipesControllers');

const getRecipesById = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await getRecipesId(id);        
        return res.status(200).json(result);
        
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}
const getRecipesByName = async (req, res) => {
    try {
        const {name} = req.query;
        if(name){
            const recipe = await getRecipesTitle(name); 
            if(recipe) return res.status(200).json(recipe);
        }else{
            const recipe = await getAllRecipes()
            return res.status(200).json(recipe);
        } 
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}
const postNewRecipes = async (req, res) => {
    try {
        const {title,image,summary, healthScore,steps,diets } = req.body;
        if(title){
            const recipe = await createRecipe({title,image,summary,healthScore,steps}, diets); 
            if(recipe) return res.status(200).send("Recipe Created");
        } 
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports= {
    getRecipesById,
    getRecipesByName,
    postNewRecipes
}