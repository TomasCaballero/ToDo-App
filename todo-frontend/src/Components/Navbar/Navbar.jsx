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
            <p>Logo</p>
        </div>
        
        <ul>
        {!user ? (
          <>
            <li>
              <NavLink to="/login">
                <p>Login</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup">
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