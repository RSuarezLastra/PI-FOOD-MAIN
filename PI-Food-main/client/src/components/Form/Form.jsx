import { useState } from "react"
import axios from "axios"
import { validation } from "./validation"
import style from './Form.module.css'

export function Form (){
var arrayDiets = ["gluten free","vegetarian","dairy free","lacto ovo vegetarian","vegan","paleolithic","primal","whole 30","pescatarian",
"ketogenic","fodmap friendly"]

    const [input, setInput] = useState({
        title: '',
        summary: '',
        healthScore: '',
        steps: '',
        image: '',
        diets: []
    })
    const [error, setError] = useState({
        title: '',
        summary: '',
        healthScore: '',
        steps: '',
        image: '',
        diets: '',
        btn: ''
    })

    const handleChange = (e) => {
        const {name, value}= e.target;
    
        if(name === 'diets'){
            if(input[name].includes(value)){
                return;
            }else{
                setInput({
                    ...input, [name]: [...input[name], value]
                })
            }
            e.target.value = ''
        }else{
            setInput({
                ...input, [name]: value
            })
        }
        setError(validation({...input,[name]: value}))
    }
    
    const handleSubmit = async () => {
        try {
            const endpoint = 'http://localhost:3001/recipes'
            const response = await axios.post(endpoint , input)
            if(response.data) alert('Recipe Created')
        } catch (error) {
            alert(error.response.data)
        }
        
    }
    const handleRemove = (deleteDiet, e) => {
        e.preventDefault();
        const updateArray = input.diets.filter((diet)=>diet !== deleteDiet)
        setInput({...input, diets: updateArray })
    }

    return(
        <form className={style.form} onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input 
                    type="text" 
                    name="title" 
                    onChange={handleChange}
                    value={input.title} />
                    {error.title && <p className={style.error}>{error.title}</p>}
            </div>
            <div>
                <label >Summary</label>
                <input 
                    type="text" 
                    name="summary" 
                    onChange={handleChange} 
                    value={input.summary} />
                    {error.summary && <p className={style.error}>{error.summary}</p> }
            </div>
            <div>
                <label >HealthScore</label>
                <input 
                    type="number" 
                    name="healthScore"
                    onChange={handleChange} 
                    value={input.healthScore}/>
                    {error.healthScore && <p className={style.error}>{error.healthScore}</p>}    
            </div>
            <div>
                <label >Steps</label>
                <input 
                    type="text" 
                    name="steps"
                    onChange={handleChange} 
                    value={input.steps} />
                    {error.steps && <p className={style.error}>{error.steps}</p>}    
            </div>
            <div>
                <label >Diets</label>
                <select 
                    name="diets" 
                    onChange={handleChange}
                    value={input.diets}>
                    <option value="Default" disabled>Diets</option>
                    {arrayDiets.map((diet, index)=> (
                        <option key={index} value={diet}>{diet}</option>)
                    )}
                </select>
                <div>
                    {input.diets.map((diet, index) => (
                        <div key={index} value={diet}>{diet}<button onClick={(e)=>handleRemove(diet, e)}>x</button></div>
                    )) }
                </div>
                {error.diets && <p className={style.error}>{error.diets}</p>}
            </div>
            <div>
                <label >Image</label>
                <input 
                    type="text" 
                    name="image"
                    onChange={handleChange}
                    value={input.image}/>
                    {error.image && <p className={style.error}>{error.image}</p>}    
            </div>
            
            
            <button type="submit" disabled={!error.btn}>CREATE</button>
        </form>
    )
}