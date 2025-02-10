import { useNavigate } from "react-router-dom";


const SignUp = ({users, setUser, obtenerUsuarios}) => {
  const navigate = useNavigate();

  const ingresar = (e)=>{
    e.preventDefault();
    let name = e.target.name.value;
    let email = e.target.email.value;
    let password = e.target.password.value;

    if(name && email && password){
      if(!users.some((user) => user.email === email)){
        crearUsuario(name, email, password);
      }else{
        alert("Ya existe una cuenta con ese email.");
      }
    }else{
      alert("Todos los campos son obligatorios.")
    }
  }

  const crearUsuario = async (name, email, password) => {
    let nuevoUsuario = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("/api/users", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevoUsuario),
      });

      if (response.ok) {
          const data = await response.json();
          alert(`Usuario creado con éxito: ${data.name}`);
          // Actualiza la lista de usuarios si es necesario
          setUser(nuevoUsuario);
          localStorage.setItem("user", JSON.stringify(nuevoUsuario));
          obtenerUsuarios();
          navigate(`/${nuevoUsuario.name}`);
      } else {
          alert("Hubo un error al crear el usuario");
      }
    } catch (error) {
        console.error("Error al realizar la solicitud POST:", error);
        alert("No se pudo completar la solicitud");
    }
  }


  return (
    <div className="loginContainer">
      <h2>Ingrese Nombre de usuario, email y contraseña:</h2>
      <form onSubmit={ingresar}>
          <input type="text" name="name" placeholder="Ingrese su nombre de usuario" />
          <input type="email" name="email" placeholder="Ingrese su email" />
          <input type="password" name="password" placeholder="Ingrese su contraseña" />
          <button type="submit">Ingresar</button>
      </form>
    </div>
  )
}

export default SignUp