import { GET_NAME, GET_RECIPES , DETAIL , CLEAR_DETAIL, ORDER, DIET_FILTER, CHARGE_DIETS, RESET_FILTER, ORIGIN_FILTER} from "./actionsType";

const initialState = {
    allRecipes: [],
    copyAllRecipes: [],
    resetState:[],
    detailRecipe: {},
    stateDiet: []
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_RECIPES:
            return{...state, allRecipes: action.payload,
            copyAllRecipes: action.payload,
            resetState: action.payload}
        case GET_NAME:
            return{...state, allRecipes: action.payload
            }
        case DETAIL:
            return{...state, detailRecipe: action.payload}
        case CLEAR_DETAIL:
            return{...state, detailRecipe: {}
            }
            case ORDER:
                const order = state.copyAllRecipes.sort((a,b)=> {
                    const titleA = a.title.toLowerCase();
                    const titleB = b.title.toLowerCase();
                    if("A-Z" === action.payload ){
                        return titleA > titleB ? 1 : -1;
                    } 
                    if("Z-A" === action.payload){
                        return titleA < titleB ? 1 : -1;
                    }
                    if("HIG" === action.payload){
                        return a.healthScore < b.healthScore ? 1 : -1;
                    }
                    if("LOW" === action.payload){
                        return a.healthScore > b.healthScore ? 1 : -1;
                    }
                return 0})
            return {...state, 
                allRecipes: order}
            case CHARGE_DIETS:
                return {...state, stateDiet: action.payload}
            case DIET_FILTER:
                const newFiltered = state.copyAllRecipes.filter((recipe)=> recipe.diets.includes(action.payload))

                return {...state, allRecipes: newFiltered}

            case ORIGIN_FILTER:
                let orgFiltered = state.copyAllRecipes.filter((r) => r.origin === action.payload)
                
                return{...state, allRecipes: orgFiltered}
            case RESET_FILTER: 
                return {...state, allRecipes: state.resetState}
        default:
            return {...state}
    }
}

// export default rootReducer;