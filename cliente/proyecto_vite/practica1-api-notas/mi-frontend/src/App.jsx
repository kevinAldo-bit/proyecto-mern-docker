import { useState, useEffect } from 'react'
import Login from './components/Login'
import Registro from './components/Registro'
import TareasList from './components/TareasList'
import './App.css'

function App() {
  const [usuario, setUsuario] = useState(null);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    // Verificar si hay token guardado al cargar la página
    const tokenGuardado = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('usuario');
    
    if (tokenGuardado && usuarioGuardado) {
      setToken(tokenGuardado);
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const handleLoginExito = (tokenNuevo, usuarioNuevo) => {
    localStorage.setItem('token', tokenNuevo);
    localStorage.setItem('usuario', JSON.stringify(usuarioNuevo));
    setToken(tokenNuevo);
    setUsuario(usuarioNuevo);
    setMostrarRegistro(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setToken(null);
    setUsuario(null);
    setMostrarRegistro(false);
  };

  if (!token) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1>Gestor de Tareas</h1>
        {mostrarRegistro ? (
          <>
            <Registro onRegistroExito={handleLoginExito} />
            <p>
              ¿Ya tienes cuenta?{' '}
              <button 
                onClick={() => setMostrarRegistro(false)}
                style={{ background: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline', border: 'none' }}
              >
                Inicia sesión aquí
              </button>
            </p>
          </>
        ) : (
          <>
            <Login onLoginExito={handleLoginExito} />
            <p>
              ¿No tienes cuenta?{' '}
              <button 
                onClick={() => setMostrarRegistro(true)}
                style={{ background: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline', border: 'none' }}
              >
                Regístrate aquí
              </button>
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Gestor de Tareas de {usuario?.nombre}</h1>
        <button 
          onClick={handleLogout}
          style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#f0f0f0' }}
        >
          Cerrar Sesión
        </button>
      </div>
      <TareasList token={token} />
    </div>
  );
}

export default App;