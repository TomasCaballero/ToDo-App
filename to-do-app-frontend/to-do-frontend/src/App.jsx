import { useEffect, useState } from "react";
import MiRoutes from "./Components/MiRoutes/MiRoutes";
import './App.css'


function App() {
  const [usuarioActual, setUsuarioActual] = useState(null);
  
  useEffect(()=>{
    usuarioActual ? localStorage.setItem("user", JSON.stringify(usuarioActual)) : "";
  }, [usuarioActual]);


  return (
    <div className="main">
      <MiRoutes setUsuarioActual={setUsuarioActual} usuarioActual={usuarioActual}/>
    </div>
  );
}

export default App;
