import React from 'react'
import { NavLink } from 'react-router-dom'

const HeaderExit = () => {

  const borrarLocalStorage = () =>{
    localStorage.clear()
  } 

  return (
    <header className='header'>
      <NavLink to={"/"} className='logo'>
      To-Do App
      <img src="./public/imgs/pen.png" alt="logo" className='penLogo'/>    
      </NavLink>
      <nav className="navbar">
        <NavLink to={"/"} className="link" onClick={borrarLocalStorage}>Salir</NavLink>
      </nav>
    </header>
  )
}

export default HeaderExit