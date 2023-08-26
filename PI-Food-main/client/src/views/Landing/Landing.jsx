import {Link} from 'react-router-dom'
import style from './Landing.module.css'


function Landing() {

return (
    <div className={style.bg_image}>
        <div className={style.container_button}>
            <h2 className={style.land_text}>FOOD</h2>
            <Link to="/home"><button className={style.land_button}>START NOW</button></Link>
        </div>
    </div>
    )
}


export default Landing;