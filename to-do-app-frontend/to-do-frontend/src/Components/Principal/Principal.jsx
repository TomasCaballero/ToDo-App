import { NavLink } from "react-router-dom";
import "./Principal.css";
import Header from "../Header/Header";

const Principal = ({ setUsuarioActual }) => {
  setUsuarioActual(null);
  return (
    <>
      <Header/>
      <div className="mainPrincipal">
        <h2 className="title">Organiza tu vida con facilidad.</h2>
      </div>
    </>
    
  );
};

export default Principal;
