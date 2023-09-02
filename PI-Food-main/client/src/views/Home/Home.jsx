import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRecipes, orderRecipes, getDietState, filterRecipes, resetFilter, originFilter } from "../../redux/actions";
import { Cards } from "../../components/Cards/Cards";
import { Pagination } from "../../components/Pagination/Pagination";
import style from "./Home.module.css"

function Home() {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.allRecipes )
    const stateDiet = useSelector((state)=> state.stateDiet)

    useEffect(()=>{
        dispatch(getRecipes())
        dispatch(getDietState())
    },[]);

    const [page, setPage] = useState(1);
    const itemsPerPage = 9;
    
    const totalPages =  Math.ceil(allRecipes.length / itemsPerPage);
    const first = (page - 1)* itemsPerPage;
    const last = (page - 1 ) * itemsPerPage + itemsPerPage
    const recipes = allRecipes.slice(first , last)
    
    const handleOrder = (event) => {
        event.preventDefault();
        const {value} = event.target;
        dispatch(orderRecipes(value))
    }
    const handleFilter = (event) => {
        setPage(1)
        event.preventDefault();
        const {value} = event.target;
        dispatch(filterRecipes(value))
    }
    const handleOrigin = (event)=>{
        setPage(1)
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
    <div className={style.container}>
        <div className={style.title}>
            <h2>Home page</h2>
        </div>
        <div className={style.btn_container}>
            <div className={style.order}>
                <h3>ORDER</h3>
                <select name="alphabetically" onChange={handleOrder} defaultValue={"DEFAULT"}>
                    <option value="DEFAULT" disabled>Alphabetically</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>
                <select name="HealthScore" onChange={handleOrder} defaultValue={"DEFAULT"}>
                    <option value="DEFAULT" disabled>HealthScore</option>
                    <option value="HIG">Higher</option>
                    <option value="LOW">Lower</option>
                </select>
            </div>
            <div className={style.filter}>
                <h3>FILTER</h3>
                <button value="RESET" onClick={handleReset}>RESET</button>
                <select name="DIET" onChange={handleFilter} defaultValue={"Default"} >
                    <option className={style.default_select} value="Default" disabled>Diet</option>
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
        <Cards recipes={recipes}/>
        <Pagination page={page} setPage={setPage} total={totalPages}/>
    </div>
    
    )

}


export default Home;