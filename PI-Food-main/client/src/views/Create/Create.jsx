import { Form } from "../../components/Form/Form";
import style from './Create.module.css';

function Create() {

    return (
    <div className={style.container}>
        <h2 className={style.title_page}>Create your own Recipe !!</h2>
        <Form/>

    </div>
    )
}


export default Create;