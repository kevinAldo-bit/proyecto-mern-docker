import { useEffect, useState } from "react";
import Column from "./Column";
import type { Task, TaskStatus } from "./types";


export default function Kanban() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("kanban");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("kanban", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTasks((prev) =>
        prev.map((t) =>
          t.status === "doing" ? { ...t, seconds: t.seconds + 1 } : t
        )
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const addTask = () => {
    if (!title.trim()) {
      alert("La tarea no puede estar vacía");
      return;
    }

    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title,
        status: "pending",
        seconds: 0,
      },
    ]);
    setTitle("");
  };

  const moveTask = (id: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  const clearDone = () => {
    setTasks((prev) => prev.filter((t) => t.status !== "done"));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚀 Tablero Kanban PRO</h1>
      <p>Tarea final – Sistemas Visuales</p>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nueva tarea..."
      />
      <button onClick={addTask}>Agregar</button>
      <button onClick={clearDone}>🧹 Limpiar terminadas</button>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <Column
          title="Pendiente"
          status="pending"
          tasks={tasks.filter((t) => t.status === "pending")}
          onDropTask={moveTask}
        />
        <Column
          title="En Ejecución"
          status="doing"
          tasks={tasks.filter((t) => t.status === "doing")}
          onDropTask={moveTask}
        />
        <Column
          title="Terminado"
          status="done"
          tasks={tasks.filter((t) => t.status === "done")}
          onDropTask={moveTask}
        />
      </div>
    </div>
  );
}
