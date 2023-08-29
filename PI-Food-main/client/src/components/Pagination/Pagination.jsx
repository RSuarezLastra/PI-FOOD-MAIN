
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
        setPage(page = p)
    }

    return(
        <div>
            <button onClick={prevPage}>{'<<<prev'}</button>
            <div>
                {pageNumber.map((p)=> (<button onClick={() =>handlerPage(p)}>{p}</button>))}
            </div>
            <button onClick={nextPage}>{'next>>>'}</button>
        </div>
    )
} 