import { useState } from "react";

interface Props {
  onLogin: () => void;
}

export default function Login({ onLogin }: Props) {
  const [user, setUser] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.trim().length < 3) {
      alert("Nombre muy corto");
      return;
    }
    localStorage.setItem("user", user);
    onLogin();
  };

  return (
    <div className="login">
      <h1>🚀 Kanban PRO</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Tu nombre"
          value={user}
          onChange={e => setUser(e.target.value)}
        />
        <button>Entrar</button>
      </form>
    </div>
  );
}
