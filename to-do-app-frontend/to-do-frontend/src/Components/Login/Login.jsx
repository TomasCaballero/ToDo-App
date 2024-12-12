import { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

const Login = ({ setUsuarioActual }) => {
  const url = "/api/users";
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  const obtenerUsuarios =  () => {
      fetch(url)
      .then((res) => res.json())
      .then((data) => setUsuarios(data));
  };

  useEffect(() => {
      obtenerUsuarios();
  }, []);

  const obtenerUsuarioPorEmail = (email) => {
      let usuario = usuarios.find(user => user.email == email);
      return usuario;
  }

  const existeUsuarioConEmail = (email) =>{
      return usuarios.some((user) => user.email === email);
  }

  const ingresar = (e) => {
      e.preventDefault();
      let email = e.target.email.value;
      let password = e.target.password.value;

      if(email && password){
          if(existeUsuarioConEmail(email)){
              let user = obtenerUsuarioPorEmail(email);

              if(user.password == password){
                  setUsuarioActual(user);
                  navigate(`/${user.name}`);
              }else{
                  console.log(user.password);
                  console.log(password);
                  alert(`La contraseña ingresada es incorrecta.`);
              }
          }else{
              alert(`No existe un usuario con email ${email}`)
          }
      }else{
          alert('Los datos son obligatorios');
      }
  };

  return (
    <>
      <Header />
      <div className="loginContainer">
        <p className="loginTitle">Login:</p>
        <form onSubmit={ingresar}>
          <input type="email" name="email" placeholder="Ingrese su email" />
          <input
            type="password"
            name="password"
            placeholder="Ingrese su contraseña"
          />
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </>
  );
};

export default Login;
