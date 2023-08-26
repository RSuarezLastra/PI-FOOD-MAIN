import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Nav.module.css"

export default function Nav(){


    return(
        <nav className={style.NavBar}>
            <SearchBar/>
            <Link to="/home" className={style.link}><h3>HOME</h3></Link>
            <Link to="/create" className={style.link} ><h3>CREATE</h3></Link>
        </nav>
    )
}