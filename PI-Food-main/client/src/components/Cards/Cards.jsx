import { CardRecipe } from "../CardRecipe/CardRecipe"


export const Cards = ({allRecipes}) => {
    
    return(
        <div>
            {allRecipes.map(({id, title, image, diets})=>(
                <CardRecipe 
                    key={id}
                    id={id}
                    title={title}
                    image={image}
                    diets={diets}
                />
            ))}
        </div>
    )
}