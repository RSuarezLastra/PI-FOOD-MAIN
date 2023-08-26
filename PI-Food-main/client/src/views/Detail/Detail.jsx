import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { clearDetail, recipeDetail } from "../../redux/actions";
import { useEffect } from "react";

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

    return (
    <>
        <h2>Detail page</h2>
        <h2>{title}</h2>
        <img src={image} alt="imagen de la receta" />
        <p>{summary}</p>
        <p>{healthScore}</p>
        <p>{steps}</p>
        <p>{diets}</p>
    </>
    )
}


export default Detail;