import { GET_RECIPES, GET_NAME, DETAIL, CLEAR_DETAIL, ORDER, CHARGE_DIETS, RESET_FILTER, DIET_FILTER, ORIGIN_FILTER } from './actionsType';
import axios from 'axios';

export const getRecipes = () => {
    const endpoint = 'http://localhost:3001/recipes';
    return async (dispatch) => {
        try {
            const {data} = await axios(endpoint);
            const recipesOrigin = data.map((recipe) => ({...recipe, origin: typeof recipe.id === 'number' ? 'API' : 'DB'}))
            console.log(recipesOrigin)
            return dispatch({
                type: GET_RECIPES,
                payload: recipesOrigin
            });
        } catch (error) {
            console.log(error.message)
        }
    }
}
export const getRecipeByName = (name) => {
    const endpoint = `http://localhost:3001/recipes/?name=${name}`;
    return async (dispatch) => {
        try {
            const {data} = await axios(endpoint)
            return dispatch({
                type: GET_NAME,
                payload: data
            });
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const recipeDetail = (id) => {
    return async (dispatch) => {
        const url = `http://localhost:3001/recipes/${id}`
        try {
            const {data} = await axios(url);
            return dispatch({
                type: DETAIL,
                payload: data
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const clearDetail = () => {
    return {
        type: CLEAR_DETAIL
    }
}

export const orderRecipes = (order) => {
    return {
        type: ORDER,
        payload: order
    }
}

export const filterRecipes = (filter) => {
    return{
        type: DIET_FILTER,
        payload: filter
    }
}

export const originFilter = (origin) => {
    return{
        type: ORIGIN_FILTER,
        payload: origin
    }
}

export const resetFilter = (reset) => {
    return {
        type: RESET_FILTER,
        payload: reset
    }
}

export const getDietState = () => {
    return async (dispatch) => {
        const url = `http://localhost:3001/diets`
        try {
            const {data} = await axios(url);
            return dispatch({
                type: CHARGE_DIETS,
                payload: data
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}