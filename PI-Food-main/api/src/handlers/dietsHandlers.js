const getDiets = require('../controllers/dietsControllers')
const { Diet } = require('../db');

const getDietsFromApi = async (req, res)=>{
    try {
        const diets = await getDiets();
        if(!diets.length) throw Error('diets not found');
        
        return res.status(200).json(diets);
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = getDietsFromApi;