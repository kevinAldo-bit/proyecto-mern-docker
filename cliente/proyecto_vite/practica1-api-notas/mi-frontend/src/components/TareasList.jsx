import { useState, useEffect } from 'react'
import '../styles/tareas.css'

function TareasList({ token }) {
  const [tareas, setTareas] = useState([]);
  const [texto, setTexto] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const consultar = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/tareas', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.status === 401) {
        setError('Tu sesión ha expirado');
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        return;
      }

      const datos = await res.json();
      setTareas(datos);
      setError('');
    } catch (err) {
      setError('Error al cargar las tareas');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const guardar = async (e) => {
    e.preventDefault();
    
    if (texto.trim().length < 3) {
      alert('La tarea debe tener al menos 3 caracteres');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/tareas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ descripcion: texto })
      });

      if (res.status === 401) {
        setError('Tu sesión ha expirado');
        return;
      }

      if (res.ok) {
        setTexto('');
        consultar();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    consultar();
  }, [token]);

  if (cargando) return <div>Cargando tareas...</div>;

  return (
    <div className="tareas-container">
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={guardar} className="tarea-form">
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Nueva tarea..."
        />
        <button type="submit">Agregar Tarea</button>
      </form>

      <div className="tareas-list">
        <h3>Mis Tareas ({tareas.length})</h3>
        {tareas.length === 0 ? (
          <p>No hay tareas aún. ¡Crea una nueva!</p>
        ) : (
          <ul>
            {tareas.map(t => (
              <li key={t._id}>
                <span>{t.descripcion}</span>
                <small>{new Date(t.createdAt).toLocaleDateString('es-ES')}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TareasList;
