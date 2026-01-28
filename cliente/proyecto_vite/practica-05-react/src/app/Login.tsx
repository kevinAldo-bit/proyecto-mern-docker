import { useState } from "react";

interface Props {
  onLogin: (session: { user: string; date: string }) => void;
}

function Login({ onLogin }: Props) {
  const [user, setUser] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user.trim()) return;

    const session = {
      user,
      date: new Date().toLocaleString(),
    };

    localStorage.setItem("session", JSON.stringify(session));
    onLogin(session);
  };

  return (
    <form className="card glass" onSubmit={handleSubmit}>
      <h1>Iniciar sesión</h1>
      <p className="subtitle">Accede con tu usuario</p>

      <input
        type="text"
        placeholder="Nombre de usuario"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />

      <button type="submit">Entrar</button>
    </form>
  );
}

export default Login;
