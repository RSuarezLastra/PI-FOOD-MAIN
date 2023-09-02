import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { clearDetail, recipeDetail } from "../../redux/actions";
import { useEffect } from "react";
import style from './Detail.module.css'

function Detail() {
    const detailRecipe = useSelector((state) => state.detailRecipe)
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(()=>{
        dispatch(recipeDetail(id))
        return () => {
            dispatch(clearDetail())
        }
    }, [])

    const {title, image, summary, healthScore, steps, diets} = detailRecipe;
    const formattedDiets = diets ? diets.map((diet, index) => (index === 0 ? diet : ` | ${diet}`)).join('') : '';
    
    return (
        <div className={style.container_page}>
            <div className={style.container_detail}>
                <h2 className={style.title_page}>Recipe information:</h2>
                <h2 className={style.title_recipe}>{title}</h2>
                <img src={image} alt="imagen de la receta" />
                <p className={style.min_margin}>Summary:</p>
                <p>{summary}</p>
                <p>Health Score:{healthScore}</p>
                <p className={style.min_margin}>Steps:</p>
                <p>{steps}</p>
                <p className={style.min_margin}>Diets:</p>
                <p>{formattedDiets}</p>
            </div>
        </div>

    )
}


export default Detail;