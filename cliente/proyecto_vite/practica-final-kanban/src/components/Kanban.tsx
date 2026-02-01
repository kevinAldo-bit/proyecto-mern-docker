import { useEffect, useState } from "react";

/* ====== TIPOS ====== */
type Status = "pending" | "doing" | "done";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: Status;
  seconds: number;
}

/* ====== COMPONENTE ====== */
export default function Kanban() {
  /* LOGIN */
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  /* KANBAN */
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [error, setError] = useState("");

  /* ====== LOCAL STORAGE ====== */
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  /* ====== TEMPORIZADOR ====== */
  useEffect(() => {
    const timer = setInterval(() => {
      setTasks(tasks =>
        tasks.map(t =>
          t.status === "doing"
            ? { ...t, seconds: t.seconds + 1 }
            : t
        )
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  /* ====== LOGIN ====== */
  const login = () => {
    if (user.trim() === "" || pass.trim() === "") return;
    setLogged(true);
  };

  /* ====== TAREAS ====== */
  const addTask = () => {
    if (title.length < 3 || description.length < 5) {
      setError("Completa correctamente el formulario");
      return;
    }

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title,
        description,
        priority,
        status: "pending",
        seconds: 0,
      },
    ]);

    setTitle("");
    setDescription("");
    setPriority("Normal");
    setError("");
  };

  const moveTask = (id: number, status: Status) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, status } : t)));
  };

  const clearDone = () => {
    setTasks(tasks.filter(t => t.status !== "done"));
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  /* ====== LOGIN VIEW ====== */
  if (!logged) {
    return (
      <div className="login">
        <h1>🔐 Inicio de Sesión</h1>
        <input
          placeholder="Usuario"
          value={user}
          onChange={e => setUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={pass}
          onChange={e => setPass(e.target.value)}
        />
        <button onClick={login}>Entrar</button>
      </div>
    );
  }

  /* ====== KANBAN VIEW ====== */
  return (
    <div className="kanban">
      <h1>🚀 Tablero Kanban PRO</h1>
      <p>Práctica Final – Sistemas Visuales</p>

      {/* FORMULARIO */}
      <div className="form">
        <input
          placeholder="Título de la tarea"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          placeholder="Descripción"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option>Alta</option>
          <option>Normal</option>
          <option>Baja</option>
        </select>
        <button onClick={addTask}>Agregar</button>
      </div>

      {error && <p className="error">{error}</p>}

      <button className="clear" onClick={clearDone}>
        🧹 Limpiar tareas terminadas
      </button>

      {/* TABLERO */}
      <div className="board">
        {(["pending", "doing", "done"] as Status[]).map(status => (
          <div
            key={status}
            className={`column ${status}`}
            onDragOver={e => e.preventDefault()}
            onDrop={e =>
              moveTask(
                Number(e.dataTransfer.getData("id")),
                status
              )
            }
          >
            <h2>
              {status === "pending"
                ? "Pendiente"
                : status === "doing"
                ? "En Ejecución"
                : "Terminado"}
            </h2>

            {tasks
              .filter(t => t.status === status)
              .map(task => (
                <div
                  key={task.id}
                  className="task"
                  draggable
                  onDragStart={e =>
                    e.dataTransfer.setData("id", task.id.toString())
                  }
                >
                  <strong>{task.title}</strong>
                  <p>{task.description}</p>
                  <small>Prioridad: {task.priority}</small>
                  {task.status === "doing" && (
                    <span className="timer">
                      ⏱ {formatTime(task.seconds)}
                    </span>
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
