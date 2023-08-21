const { Router } = require('express');
// Importar todos los routers;
const recipeRoute = require('./recipesRoutes');
const dietRoute = require('./dietsRoutes');

// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipeRoute);
router.use('/diets', dietRoute);

module.exports = router;
