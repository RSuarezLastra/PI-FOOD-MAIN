import { CardRecipe } from "../CardRecipe/CardRecipe"
import style from './Cards.module.css';


export const Cards = ({allRecipes}) => {
    
    return(
        <div className={style.card_container}>
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