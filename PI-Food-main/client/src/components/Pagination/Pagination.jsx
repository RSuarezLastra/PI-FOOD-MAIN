import { useState } from "react"
import style from './Pagination.module.css'

export function Pagination({page, setPage, total}){

    let pageNumber = []
    
    for (let i = 1; i <= total; i++) {
        pageNumber.push(i)
    }

    const prevPage=() =>{
        if(page > 1){
            setPage(page - 1)
        }
    }
    const nextPage=() =>{
        setPage(page + 1)
    }
    const handlerPage = (p) => {
        setPage(p)
    }
    return(
        <div className={style.page_container}>
            <button className={style.btn} onClick={prevPage}>{'<<<prev'}</button>
            <div className={style.btn_container}>
                {pageNumber.map((p , index)=> (<button key={index} className={page === p ? style.active : style.btn} onClick={() =>handlerPage(p)}>{p}</button>))}
            </div>
            <button className={style.btn} onClick={nextPage}>{'next>>>'}</button>
        </div>
    )
} 