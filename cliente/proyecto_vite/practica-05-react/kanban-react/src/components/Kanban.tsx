import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Task = {
  id: string;
  text: string;
  status: "pendiente" | "ejecucion" | "terminado";
};

export default function Kanban() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("kanban-tasks", []);
  const [text, setText] = useState("");

  function addTask() {
    if (!text.trim()) return;

    const nueva: Task = {
      id: crypto.randomUUID(),
      text,
      status: "pendiente",
    };

    setTasks([...tasks, nueva]);
    setText("");
    alert("✅ Tarea creada correctamente");
  }

  function onDragStart(e: React.DragEvent, id: string) {
    e.dataTransfer.setData("id", id);
  }

  function onDrop(e: React.DragEvent, status: Task["status"]) {
    const id = e.dataTransfer.getData("id");
    setTasks(tasks.map(t => t.id === id ? { ...t, status } : t));
  }

  function limpiarTerminadas() {
    setTasks(tasks.filter(t => t.status !== "terminado"));
  }

  function tareasPorEstado(status: Task["status"]) {
    return tasks.filter(t => t.status === status);
  }

  function colorColumna(cantidad: number) {
    if (cantidad <= 2) return "libre";
    if (cantidad <= 4) return "ocupado";
    return "saturado";
  }

  function renderColumna(titulo: string, status: Task["status"]) {
    const lista = tareasPorEstado(status);

    return (
      <div
        className={`columna ${colorColumna(lista.length)}`}
        onDragOver={e => e.preventDefault()}
        onDrop={e => onDrop(e, status)}
      >
        <h3>{titulo}</h3>

        {lista.map(t => (
          <div
            key={t.id}
            className="tarea"
            draggable
            onDragStart={e => onDragStart(e, t.id)}
          >
            {t.text}
          </div>
        ))}
      </div>
    );
  }

  return (
    <main className="kanban">
      <h1>🚀 Tablero Kanban PRO</h1>
      <p className="sub">Tarea que se entrega el martes 3 de febrero</p>

      <div className="form">
        <input
          placeholder="Nueva tarea..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button onClick={addTask}>Agregar</button>
      </div>

      <section className="board">
        {renderColumna("Pendiente", "pendiente")}
        {renderColumna("En Ejecución", "ejecucion")}
        {renderColumna("Terminado", "terminado")}
      </section>

      <button className="limpiar" onClick={limpiarTerminadas}>
        🧹 Limpiar tareas terminadas
      </button>
    </main>
  );
}


