import "./Signup.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

const Signup = ({ setUsuarioActual }) => {
  const url = "/api/users";
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  const obtenerUsuarios = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUsuarios(data));
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const existeUsuarioConEmail = (email) => {
    return usuarios.some((user) => user.email === email);
  };

  const ingresar = (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let email = e.target.email.value;
    let password = e.target.password.value;

    if (name && email && password) {
      if (!existeUsuarioConEmail(email)) {
        let nuevoUsuario = {
          name: name,
          email: email,
          password: password,
        };
        console.log(nuevoUsuario);
        cargarUsuarioABaseDeDatos(nuevoUsuario);
      } else {
        alert(`Ya existe un usuario con email ${email}`);
      }
    } else {
      alert("Los datos son obligatorios");
    }
  };

  const cargarUsuarioABaseDeDatos = async (nuevoUsuario) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoUsuario),
      });

      if (response.ok) {
        const user = await response.json(); // Usuario completo retornado por el servidor
        //alert(`Usuario creado con éxito: ${user.name}`);

        // Establecer el usuario actual y redirigir
        setUsuarioActual(user);
        navigate(`/${user.name}`);
      } else {
        alert("Hubo un error al crear el usuario.");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
      alert("No se pudo completar la solicitud");
    }
  };

  return (
    <>
      <Header />
      <div className="loginContainer">
        <p className="loginTitle">Sign Up:</p>
        <form onSubmit={ingresar}>
          <input
            type="text"
            name="name"
            placeholder="Ingrese su nombre de usuario"
          />
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

export default Signup;
