import { useEffect, useState } from "react";
import "./UserStyle.css"

const User = () => {
    const [tasks, setTasks] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [idTareaEditar, setIdTareaEditar] = useState(null);
    
    useEffect(()=>{
        let tasksLocalStorage = JSON.parse(localStorage.getItem("user")).tasks;
        console.log(tasksLocalStorage);
        setTasks(tasksLocalStorage);
        console.log(tasks.length);
    },[]);

    const abrirModal = (boolean) => {
        setModal(boolean); // Cambia el estado del modal (abrir o cerrar)
    };

    const abrirModalEdit = (boolean, id) => {
        setModalEdit(boolean);
        setIdTareaEditar(id);
    }

    const crearTarea = (e) =>{
        e.preventDefault();
        let title = e.target.title.value;
        let content = e.target.content.value;
        
        if(title && content){
            console.log(JSON.parse(localStorage.getItem("user")).id);
            let task = {
                user:{
                    id: JSON.parse(localStorage.getItem("user")).id
                },
                title: title,
                date: obtenerFechaActual(),
                content: content
            }
            guardarTaskEnBaseDeDatos(task);
            abrirModal(false)
        }else{
            alert("Ambos campos son obligatorios");
        }
    }

    const obtenerFechaActual = () => {
        const fecha = new Date();
        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');
    
        return `${año}-${mes}-${dia}`;
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
            alert(`Tarea creada con éxito: ${task.title}`);
            
            setTasks((prevTasks) => [...prevTasks, task]);
          } else {
            alert("Hubo un error al crear la tarea.");
          }
        } catch (error) {
          console.error("Error al realizar la solicitud POST:", error);
          alert("No se pudo completar la solicitud");
        }
    };

    const eliminarTarea = async (id) => {
        try {
            const response = await fetch(`/api/tasks/${id}`, {
              method: "DELETE",
            });
        
            if (response.ok) {
              alert("Tarea eliminada con éxito");
              setTasks(tasks.filter((task) => task.id !== id)); // Actualiza el estado
            } else {
              alert("Error al eliminar la tarea");
            }
          } catch (error) {
            console.error("Error en la solicitud DELETE:", error);
            alert("No se pudo completar la solicitud");
          }

    }
      
    const editarTarea = (e) => {
        e.preventDefault();
        let newTitle = e.target.title.value;
        let newContent = e.target.content.value;

        if(newTitle && newContent){
            let taskEdit = {
                id: idTareaEditar,
                title: newTitle,
                date: obtenerFechaActual(),
                content: newContent
            };
            editar(taskEdit);
        }else{
            alert("Ambos campos son obligatorios.");
        }
    }

    const editar = async (task) => {
        try {
            const response = await fetch(`/api/tasks/${idTareaEditar}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(task),
            });
      
            if (!response.ok) {
              throw new Error('Error al actualizar los datos');
            }
      
            setTasks((prevTasks) =>
                prevTasks.map((t) => (t.id === task.id ? task : t))
            );
    
            alert('Tarea actualizada con éxito');
            setModalEdit(false);
          } catch (error) {
            console.error('Error:', error);
          }
    }
    
  
  
  
    return (
    <>  
    <div className="userContainer">
        <div className="tasksHeader">
            <p>Mis Tareas:</p>
            <button onClick={() => abrirModal(true)}>Nueva Tarea</button>
        </div>
        <div className="tasksContainer">
            {
                tasks.length > 0 ? (
                    <>
                        {
                            tasks.map((task)=>{
                                return ( // Agrega el return aquí
                                    <div key={task.id} className="task">
                                        <p>{task.date}</p>
                                        <p>{task.title}</p>
                                        <p>{task.content}</p>
                                        <div className="controller">
                                            <button onClick={()=>abrirModalEdit(true, task.id)}>Editar</button>
                                            <button onClick={()=>eliminarTarea(task.id)}>Eliminar</button>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </>
                ):<p>No hay tareas</p>
            }
            
        </div>
    </div>
    
    <div className={modal === false ? "nuevaTareaModal modal modalClose" : "nuevaTareaModal modal"}>
        <div className="modalHeader">
            <p>Nueva tarea:</p>
            <button className="btnCerrar" onClick={() => abrirModal(false)}>X</button>
        </div>
        <div className="modalContent">
            <form onSubmit={crearTarea} className="modalContent">
                <input type="text" name="title" placeholder="Ingrese el título" />
                <input type="text" name="content" placeholder="Ingrese el contenido" />
                <button type="submit">Crear</button>
            </form>
        </div>
    </div>

    <div className={modalEdit === false ? "editarTareaModal modal modalClose" : "editarTareaModal modal"}>
        <div className="modalHeader">
            <p>Editar tarea:</p>
            <button className="btnCerrar" onClick={() => abrirModalEdit(false, null)}>X</button>
        </div>
        <div className="modalContent">
            <form onSubmit={editarTarea} className="modalContent">
                <input type="text" name="title" placeholder="Ingrese el título" />
                <input type="text" name="content" placeholder="Ingrese el contenido" />
                <button type="submit">Guardar</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default User
