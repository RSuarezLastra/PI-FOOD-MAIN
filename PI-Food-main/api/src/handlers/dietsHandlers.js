const getDiets = require('../controllers/dietsControllers')
const { Diet } = require('../db');

const getDietsFromApi = async (req, res)=>{
    try {
        const results = await Diet.findAll();
        if(!results.length){
            const diets = await getDiets();
            if(diets.length){
                return res.status(200).json(diets);
            }
        }else return res.status(200).json(results);
        
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = getDietsFromApi;