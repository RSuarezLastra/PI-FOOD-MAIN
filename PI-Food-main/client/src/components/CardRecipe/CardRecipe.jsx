import { Link } from "react-router-dom"
import style from './CardRecipe.module.css'

export  const CardRecipe = ({id, title, image, diets}) => {
    
    return(
        <div className={style.card}>
            <Link to={`/detail/${id}`} className={style.link}><h2>{title}</h2></Link>
            <img src={image}/>
            <h2>{diets}</h2>
        </div>
    )
}