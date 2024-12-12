import { NavLink } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <header className='header'>
      <NavLink to={"/"} className='logo'>
      To-Do App
      <img src="./public/imgs/pen.png" alt="logo" className='penLogo'/>    
      </NavLink>
      <nav className="navbar">
        <NavLink to={"/login"} className="link">Login</NavLink>
        <NavLink to={"/signup"} className="link">Sign Up</NavLink>
      </nav>
    </header>
  )
}

export default Header