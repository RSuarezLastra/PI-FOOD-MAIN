import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName } from "../../redux/actions";
import style from './SearchBar.module.css'

function SearchBar(){
    
    const dispatch = useDispatch();
    const [search, setSearch] = useState(""); //se setea el estado del input

    function handleChange(event) { //recibe lo que se pone en el input y se lo asigna al estado search
        event.preventDefault();
        setSearch(event.target.value)
    };

    function handleSubmit(event) { //despacha la funcion de searchByname con el string que viene delestado search
        event.preventDefault();
        if (search === "") {
            alert("Must provide a name to search")
        } else {
            dispatch(getRecipeByName(search))
        }
    }

    return(
        <div className={style.containerBar}>
            <input
                className={style.searchBar}
                type="search"
                placeholder="Search Recipe"
                onChange={handleChange}/>
            <button
                className={style.search_btn}
                onClick={(event)=>{handleSubmit(event)}}
                >search</button>
        </div>
    )
    
}

export default SearchBar
