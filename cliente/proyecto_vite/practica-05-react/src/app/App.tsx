import { useEffect, useState } from "react";
import Login from "./Login";

interface Session {
  user: string;
  date: string;
}

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("session");
    if (saved) {
      setSession(JSON.parse(saved));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("session");
    setSession(null);
  };

  return (
    <div className="container">
      {session ? (
        <div className="card glass">
          <h1>👋 Bienvenido</h1>
          <p className="user">{session.user}</p>
          <p className="date">Sesión iniciada el:</p>
          <span>{session.date}</span>

          <button className="secondary" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      ) : (
        <Login onLogin={setSession} />
      )}
    </div>
  );
}

export default App;
