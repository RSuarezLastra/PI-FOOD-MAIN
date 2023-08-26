import {Route, Routes, useLocation} from 'react-router-dom';
import {Landing, Home, Detail, Create} from "./views/index";
import Nav from './components/Nav/Nav';



function App() {
  
  const location = useLocation()

  return (
    <>
      {location.pathname !== '/' && <Nav/>}
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/create' element={<Create/>}/>
      </Routes>
    </>
  )
}

export default App
