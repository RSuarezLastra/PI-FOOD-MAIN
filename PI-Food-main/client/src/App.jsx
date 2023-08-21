import {Route, Routes} from 'react-router-dom';
import {Landing, Home, Detail, Create} from "./views/index"


function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/home/:id' element={<Detail/>}/>
        <Route path='/create' element={<Create/>}/>
      </Routes>
    </>
  )
}

export default App
