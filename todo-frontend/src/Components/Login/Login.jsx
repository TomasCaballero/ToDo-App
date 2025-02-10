import { useNavigate } from "react-router-dom";
import "./LoginStyle.css"


const Login = ({users, setUser}) => {
    const navigate = useNavigate();

    const existeUsuarioConEmail = (email) => {
        return users.some((user) => user.email === email);
    };

    const ingresar = (e) => {
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;

        if (email && password) {
            if (!existeUsuarioConEmail(email)) {
              alert("El email no está registrado");
            }else{
                const usuarioLogueado = users.find((user) => user.email === email);
                if (usuarioLogueado && usuarioLogueado.password == password) {
                    setUser(usuarioLogueado); // Actualiza el usuario en el estado global
                    navigate(`/${usuarioLogueado.name}`); // Redirige a /nameUser

                    localStorage.setItem("user", JSON.stringify(usuarioLogueado));
                } else {
                    alert("Credenciales incorrectas");
                }
            }
        } else {
            alert("Todos los campos son obligatorios");
        }
    }

  return (
    <div className="loginContainer">
        <h2>Ingrese su email y contraseña:</h2>
        <form onSubmit={ingresar}>
            {/* <input type="text" name="name" placeholder="Ingrese su nombre de usuario" /> */}
            <input type="email" name="email" placeholder="Ingrese su email" />
            <input type="password" name="password" placeholder="Ingrese su contraseña" />
            <button type="submit">Ingresar</button>
        </form>
    </div>
  )
}

export default Login