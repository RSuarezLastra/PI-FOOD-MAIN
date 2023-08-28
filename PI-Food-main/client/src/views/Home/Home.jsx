import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRecipes, orderRecipes, getDietState, filterRecipes, resetFilter, originFilter } from "../../redux/actions";
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
    const handleOrigin = (event)=>{
        event.preventDefault();
        const {value} = event.target;
        dispatch(originFilter(value))
    }
    const handleReset = (event)=> {
        event.preventDefault();
        const {value} = event.target;
        dispatch(resetFilter(value))
    };
    return (
    <>
        <div>
            <h2>Home page</h2>
        </div>
        <div>
            <div>
                <h3>ORDER</h3>
                <select name="alphabetically" onChange={handleOrder} defaultValue={"DEFAULT"}>
                    <option value="DEFAULT" disabled>alphabetically</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>
                <select name="HealthScore" onChange={handleOrder} defaultValue={"DEFAULT"}>
                    <option value="DEFAULT" disabled>HealthScore</option>
                    <option value="HIG">Higher</option>
                    <option value="LOW">Lower</option>
                </select>
            </div>
            <div>
                <h3>FILTER</h3>
                <button value="RESET" onClick={handleReset}>RESET</button>
                <select name="DIET" onChange={handleFilter} defaultValue={"Default"} >
                    <option value="Default" disabled>Diet</option>
                    {stateDiet.map((diet)=>{
                        return <option value={diet}>{diet}</option>
                    })}
                </select>
                <select name="Origin" onChange={handleOrigin} defaultValue={"Default"} >
                    <option value="Default" disabled>Origin</option>
                    <option value="API">Api</option>
                    <option value="DB">DataBase</option>
                </select>
            </div>
        </div>
        <Cards allRecipes={allRecipes}/>

    </>
    
    )

}


export default Home;