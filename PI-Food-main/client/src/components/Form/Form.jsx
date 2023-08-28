import { useState } from "react"

function Form (){
    const [input, setInput] = useState({
        title: '',
        summary: '',
        healthScore: 0,
        steps: '',
        image: '',
        diets: []
    })

    const handleChange = (e) => {
        const prop = e.target.name;
        const value = e.target.value;
        setInput({
            ...input, [prop]: value
        })
    }

    return(
        <form onSubmit=''>
            <div>
                <label onChange={handleChange}>Name</label>
                <input type="text" name="title" />
            </div>
            <div>
                <label onChange={handleChange}>Summary</label>
                <input type="text" name="summary" />
            </div>
            <div>
                <label onChange={handleChange}>HealthScore</label>
                <input type="text" name="healthScore" />    
            </div>
            <div>
                <label onChange={handleChange}>Steps</label>
                <input type="text" />    
            </div>
            <div>
                <label onChange={handleChange}>Image</label>
                <input type="text" />    
            </div>
            <div>
                <label onChange={handleChange}>Diets</label>
                <select name="">

                </select>
            </div>
            
            <button></button>
        </form>
    )
}