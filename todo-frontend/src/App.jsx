import { useEffect, useState } from 'react'

import Router from "./Components/Router/Router";

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

 

  const obtenerUsuarios = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      cargarUsuarios(data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const cargarUsuarios = (data) => {
    setUsers(data);
  }

  useEffect(() => {
    obtenerUsuarios();
    console.log(users);
  }, []);
  
  return (
    <>
      <Router setUsers={setUsers} users={users} setUser={setUser} user={user} obtenerUsuarios={obtenerUsuarios}/>
    </>
  )
}

export default App
