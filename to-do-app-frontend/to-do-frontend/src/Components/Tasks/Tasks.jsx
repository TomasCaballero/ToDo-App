import { useEffect, useState } from "react";
import "./Tasks.css";
import HeaderExit from "../HeaderExit/HeaderExit";

const Tasks = ({ usuarioActual, setUsuarioActual }) => {
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const [tasks, setTasks] = useState([]);
  const [idTaskActual, setIdTaskActual] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const actualizarUsuarioActual = () => {
    const url = `/api/users/${userId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUsuarioActual(data));
  };

  useEffect(() => {
    actualizarUsuarioActual();
  }, []);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("user")).tasks);
  }, []);

  const cerrar = (boolean) => {
    setModal(boolean); // Cambia el estado del modal (abrir o cerrar)
  };

  const cerrarEdit = (bool, int)=>{
    setModalEdit(bool);
    setIdTaskActual(int);
  }

  const obtenerFechaActual = () => {
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = String(hoy.getMonth() + 1).padStart(2, "0"); // Mes (0-indexado)
    const day = String(hoy.getDate()).padStart(2, "0"); // Día

    return `${year}-${month}-${day}`;
  };

  const crear = (e) => {
    e.preventDefault();
    let title = e.target.title.value;
    let content = e.target.content.value;

    if (title && content) {
      let newTask = {
        user: {
          id: usuarioActual.id,
        },
        title: title,
        date: obtenerFechaActual(),
        content: content,
      };
      guardarTaskEnBaseDeDatos(newTask);
      cerrar(false);
    } else {
      alert("Debe completar todos los datos.");
    }
  };

  const guardarTaskEnBaseDeDatos = async (newTask) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        const task = await response.json();

        tasksDelServiddor();
        // Actualizar el estado de tasks con la nueva tarea
        // setTasks((prevTasks) => [...prevTasks, task]);
      } else {
        alert("Hubo un error al crear la tarea.");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
      alert("No se pudo completar la solicitud");
    }

    actualizarStorage();
  };

  const tasksDelServiddor = async () => {
    const url = `/api/users/${userId}`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks));
  }

  const eliminar = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.ok) {
        // const task = await response.json();

        tasksDelServiddor();
      } else {
        alert("Hubo un error al eliminar la tarea.");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
      alert("No se pudo completar la solicitud");
    }

    actualizarStorage();
  };




  const editar = async (e) => {
    e.preventDefault();

    let title = e.target.title.value;
    let content = e.target.content.value;

    if (title && content) {
      let editTask = {
        id: usuarioActual.id,
        title: title,
        date: obtenerFechaActual(),
        content: content,
      };
      guardarTaskEditadaEnBaseDeDatos(editTask);
      cerrarEdit(false);
    } else {
      alert("Debe completar todos los datos.");
    }
    
  }

  const guardarTaskEditadaEnBaseDeDatos = async (task) => {
    try {
      const response = await fetch(`/api/tasks/${idTaskActual}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        const task = await response.json();

        tasksDelServiddor();
      } else {
        alert("Hubo un error al crear la tarea.");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
      alert("No se pudo completar la solicitud");
    }

    actualizarStorage();
  }

  const actualizarStorage = async () => {
    await fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => localStorage.setItem("user",JSON.stringify(data)))
  }

  return (
    <>
      <HeaderExit />
      
      <div className="tasksContainer">
        <header className="headerTasks">
          <h3 className="title">Tareas:</h3>
          <button className="crearTarea" onClick={() => cerrar(true)}>
            Nueva Tarea
          </button>
        </header>
        <div className="mainTasks">
          {tasks.length > 0 ? (
            <table>
              <thead>
                <th>Nro°</th>
                <th>Título</th>
                <th>Descripción</th>
                <th>Fecha</th>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={task.id}>
                    <td>{index + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.content}</td>
                    <td>{task.date}</td>
                    <td>
                      <button className="editar" onClick={() => cerrarEdit(true, task.id)}>Editar</button> |{" "}
                      <button
                        className="eliminar"
                        onClick={() => eliminar(task.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="tareasnt">No existen tareas</p>
          )}
        </div>
      </div>

      {/* MODAL CREAR TAREA */}
      <div className={modal === false ? "modal close" : "modal"}>
        <div className="modalHeader">
          <p>Nueva Tarea:</p>
          <button className="btnCerrar" onClick={() => cerrar(false)}>
            X
          </button>
        </div>
        <div className="modalMain">
          <form onSubmit={crear} className="formNuevaTarea">
            <input type="text" name="title" placeholder="Ingrese el título" />
            <input
              type="text"
              name="content"
              placeholder="Ingrese la descripción"
            />
            <button type="submit">Guardar</button>
          </form>
        </div>
      </div>

      {/* MODAL EDITAR TAREA */}
      <div className={modalEdit === false ? "modalEdit close" : "modalEdit"}>
        <div className="modalHeader">
          <p>Editar Tarea:</p>
          <button className="btnCerrar" onClick={() => cerrarEdit(false)}>
            X
          </button>
        </div>
        <div className="modalMain">
          <form onSubmit={editar} className="formNuevaTarea">
            <input type="text" name="title" placeholder="Ingrese el título" />
            <input
              type="text"
              name="content"
              placeholder="Ingrese la descripción"
            />
            <button type="submit">Guardar</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Tasks;
