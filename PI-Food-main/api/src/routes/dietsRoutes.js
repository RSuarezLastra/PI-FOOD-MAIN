const getDietsFromApi = require('../handlers/dietsHandlers');

const dietRoute = require('express').Router();

dietRoute.get('/', getDietsFromApi);

module.exports = dietRoute;