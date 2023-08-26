import { GET_NAME, GET_RECIPES , DETAIL , CLEAR_DETAIL, ORDER, FILTER, CHARGE_DIETS, RESET_FILTER} from "./actionsType";

const initialState = {
    allRecipes: [],
    copyAllRecipes: [],
    detailRecipe: {},
    stateDiet: []
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_RECIPES:
            return{...state, allRecipes: action.payload,
            copyAllRecipes: action.payload}
        case GET_NAME:
            return{...state, 
                allRecipes: action.payload
            }
        case DETAIL:
            return{...state,
                detailRecipe: action.payload}
        case CLEAR_DETAIL:
            return{...state,
                detailRecipe: {}
            }
            case ORDER:
                const order = [...state.allRecipes].sort((a,b)=> {
                    if("A-Z" === action.payload ){
                        return a.title > b.title ? 1 : -1;
                    } 
                    if("Z-A" === action.payload){
                        return a.title < b.title ? 1 : -1;
                    }
                return 0})
            return {...state, 
                allRecipes: order}
            case CHARGE_DIETS:
                return {...state, 
                    stateDiet: action.payload}
            case FILTER:
                const newFiltered = [...state.copyAllRecipes].filter((recipe)=> recipe.diets.includes(action.payload))
                return {...state,
                    allRecipes: newFiltered
                }
            case RESET_FILTER: 
                return {...state,
                    allRecipes: state.copyAllRecipes
                }
        default:
            return {...state}
    }
}

export default rootReducer;