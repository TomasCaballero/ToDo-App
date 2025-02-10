import { BrowserRouter, Route, Routes} from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import Inicio from "../Inicio/Inicio"
import Login from "../Login/Login"
import SignUp from "../SignUp/SignUp"
import User from "../User/User"

const Router = ({setUsers, users, setUser, user, obtenerUsuarios}) => {
  return (
    <BrowserRouter>
        <Navbar user={user} setUser={setUser}/>

        <Routes>
            <Route path="/" element={<Inicio/>}/>
            <Route path="/login" element={<Login users={users} setUser={setUser}/>}/>
            <Route path="/signup" element={<SignUp users={users} setUser={setUser} obtenerUsuarios={obtenerUsuarios}/>}/>
            <Route path="/:username" element={<User user={user}/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Router