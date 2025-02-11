import { NavLink } from "react-router-dom"
import "./NavbarStyle.css"

const Navbar = ({user, setUser}) => {

  const borrarUserActual = () => {
    setUser(null);
    localStorage.clear();
  }

  return (
    <nav>
        <div className="logoContainer">
            <img src="public/img/logo.png" alt="logo" className="logo"/>
        </div>
        
        <ul>
        {!user ? (
          <>
            <li>
              <NavLink to="/login" className="link">
                <p>Login</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" className="link">
                <p>SignUp</p>
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/" onClick={borrarUserActual}>
              <p>Salir</p>
            </NavLink>
          </li>
        )}
            
        </ul>
    </nav>
  )
}

export default Navbar