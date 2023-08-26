import { Link } from "react-router-dom"

export  const CardRecipe = ({id, title, image, diets}) => {
    
    return(
        <div>
            <Link to={`/detail/${id}`}><h2>{title}</h2></Link>
            <img src={image}/>
            <h2>{diets}</h2>
        </div>
    )
}