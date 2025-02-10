import { useEffect, useState } from "react";
import "./UserStyle.css"

const User = () => {
    const [tasks, setTasks] = useState([]);
    
    useEffect(()=>{
        let tasksLocalStorage = JSON.parse(localStorage.getItem("user")).tasks;
        console.log(tasksLocalStorage);
        setTasks(tasksLocalStorage);
        console.log(tasks.length);
    },[])
  return (
    <>
    
    <div className="userContainer">
        <div className="tasksHeader">
            <p>Mis Tareas:</p>
            <button>Nueva Tarea</button>
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
                                            <button>Editar</button>
                                            <button>Eliminar</button>
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
    
    </>
  )
}

export default User
