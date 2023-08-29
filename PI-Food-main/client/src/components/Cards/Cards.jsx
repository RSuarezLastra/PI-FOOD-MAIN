import { CardRecipe } from "../CardRecipe/CardRecipe"
import style from './Cards.module.css';


export const Cards = ({recipes}) => {
    console.log('cards component',recipes)
    return(
        <div className={style.card_container}>
            {recipes.map(({id, title, image, diets})=>(
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