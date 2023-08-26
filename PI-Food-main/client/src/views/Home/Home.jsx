import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRecipes, orderRecipes, getDietState, filterRecipes, resetFilter } from "../../redux/actions";
import { Cards } from "../../components/Cards/Cards";


function Home() {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.allRecipes )
    const stateDiet = useSelector((state)=> state.stateDiet)

    useEffect(()=>{
        dispatch(getRecipes())
        dispatch(getDietState())
    },[]);
    
    const handleOrder = (event) => {
        event.preventDefault();
        const {value} = event.target;
        dispatch(orderRecipes(value))
    }
    const handleFilter = (event) => {
        event.preventDefault();
        const {value} = event.target;
        dispatch(filterRecipes(value))
    }
    const handleReset = (event)=> {
        event.preventDefault();
        const {value} = event.target;
        dispatch(resetFilter(event))
    };
    let diets = []
    stateDiet.map((element)=> {
        diets.push(element.name)
    })
    return (
    <>
        <div>
            <h2>Home page</h2>
        </div>
        <div>
            <div>
                <h3>ORDER</h3>
                <button value="A-Z" onClick={handleOrder}>A-Z</button>
                <button value="Z-A" onClick={handleOrder}>Z-A</button>
            </div>
            <div>
                <h3>FILTER</h3>
                <button value="RESET" onClick={handleReset}>RESET</button>
                <select name="Filter" onChange={handleFilter} defaultValue={"Default"} >
                    <option value="Default" disabled>Diet</option>
                    {diets.map((diet)=>{
                        return <option value={diet}>{diet}</option>
                    })}
                </select>
            </div>
        </div>
        <Cards allRecipes={allRecipes}/>

    </>
    
    )

}


export default Home;