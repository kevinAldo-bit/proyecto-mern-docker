import { useState, useEffect } from 'react'

function App() {
  const [tareas, setTareas] = useState([]);
  const [texto, setTexto] = useState("");

  const consultar = async () => {
    const res = await fetch('http://localhost:3000/api/tareas');
    setTareas(await res.json());
  };

  const guardar = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3000/api/tareas', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ descripcion: texto })
    });
    setTexto(""); consultar();
  };

  useEffect(() => { consultar() }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Gestor de Tareas de Aldo</h1>
      <form onSubmit={guardar}>
        <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Nueva tarea..." />
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {tareas.map(t => <li key={t._id}>{t.descripcion}</li>)}
      </ul>
    </div>
  )
}
export default App