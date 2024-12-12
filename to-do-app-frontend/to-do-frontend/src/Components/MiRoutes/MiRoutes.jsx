import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from '../Login/Login'
import Tasks from '../Tasks/Tasks'
import Principal from '../Principal/Principal'
import Signup from '../Signup/Signup'
import Header from '../Header/Header'

const MiRoutes = ({ setUsuarioActual, usuarioActual }) => {
  return (
    <BrowserRouter>
      
        <Routes>
            <Route path='/' element={<Principal  setUsuarioActual={setUsuarioActual} />} />
            <Route path='/login' element={<Login  setUsuarioActual={setUsuarioActual} />} />
            <Route path='/signup' element={<Signup  setUsuarioActual={setUsuarioActual} />} />
            <Route path='/:username' element={<Tasks usuarioActual={usuarioActual} setUsuarioActual={setUsuarioActual}/>} />
        </Routes>
        
    </BrowserRouter>
  )
}

export default MiRoutes