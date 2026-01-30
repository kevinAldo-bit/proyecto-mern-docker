import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

export default function App() {
  // =========================
  // ESTADOS
  // =========================
  const [cliente, setCliente] = useState("");
  const [correo, setCorreo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [tipoServicio, setTipoServicio] = useState("web");
  const [prioridad, setPrioridad] = useState<"alta" | "media" | "baja">("media");
  const [acepta, setAcepta] = useState(false);

  const [progreso, setProgreso] = useState(0);
  const [registrado, setRegistrado] = useState(false);

  const clienteRef = useRef<HTMLInputElement | null>(null);

  // =========================
  // VALIDACIONES (useMemo)
  // =========================
  const formularioValido = useMemo(() => {
    let p = 0;

    if (cliente.trim().length >= 3) p += 20;
    if (correo.includes("@")) p += 20;
    if (descripcion.trim().length >= 10) p += 20;
    if (tipoServicio) p += 20;
    if (acepta) p += 20;

    setProgreso(p);
    return p === 100;
  }, [cliente, correo, descripcion, tipoServicio, acepta]);

  // =========================
  // ACCIONES
  // =========================
  const registrar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formularioValido) return;
    setRegistrado(true);
  };

  const limpiar = () => {
    setCliente("");
    setCorreo("");
    setDescripcion("");
    setTipoServicio("web");
    setPrioridad("media");
    setAcepta(false);
    setProgreso(0);
    setRegistrado(false);
    clienteRef.current?.focus();
  };

  // =========================
  // UI REGISTRO
  // =========================
  const Registro = (
    <section className="card">
      <header className="header">
        {/* IMAGEN VECTORIAL */}
        <svg width="40" height="40" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="30" fill="#3498db" />
          <text x="32" y="38" textAnchor="middle" fontSize="18" fill="white">
            SV
          </text>
        </svg>

        <h1>Sistema Visual de Pedidos</h1>
      </header>

      <form onSubmit={registrar} className="form">
        {/* INPUT */}
        <label>
          Nombre del cliente
          <input
            ref={clienteRef}
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            placeholder="Ej. Aldo Cruz"
          />
        </label>

        {/* INPUT */}
        <label>
          Correo electrónico
          <input
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="correo@email.com"
          />
        </label>

        {/* TEXT BOX */}
        <label>
          Descripción del pedido
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Describe el servicio solicitado..."
          />
        </label>

        {/* LISTA DESPLEGABLE */}
        <label>
          Tipo de servicio
          <select
            value={tipoServicio}
            onChange={(e) => setTipoServicio(e.target.value)}
          >
            <option value="web">Desarrollo Web</option>
            <option value="movil">Aplicación Móvil</option>
            <option value="soporte">Soporte Técnico</option>
          </select>
        </label>

        {/* RADIO BUTTON */}
        <div>
          <p>Prioridad</p>
          <label>
            <input
              type="radio"
              checked={prioridad === "alta"}
              onChange={() => setPrioridad("alta")}
            />
            Alta
          </label>

          <label>
            <input
              type="radio"
              checked={prioridad === "media"}
              onChange={() => setPrioridad("media")}
            />
            Media
          </label>

          <label>
            <input
              type="radio"
              checked={prioridad === "baja"}
              onChange={() => setPrioridad("baja")}
            />
            Baja
          </label>
        </div>

        {/* CHECKBOX */}
        <label className="check">
          <input
            type="checkbox"
            checked={acepta}
            onChange={(e) => setAcepta(e.target.checked)}
          />
          Acepto términos y condiciones
        </label>

        {/* BARRA DE PROGRESO */}
        <div className="progress">
          <div className="bar">
            <div
              className="fill"
              style={{
                width: `${progreso}%`,
                background:
                  progreso < 40
                    ? "#e74c3c"
                    : progreso < 80
                    ? "#f1c40f"
                    : "#2ecc71",
              }}
            />
          </div>
          <small>{progreso}% completado</small>
        </div>

        {/* BOTONES */}
        <div className="buttons">
          <button type="submit" disabled={!formularioValido}>
            Registrar Pedido
          </button>

          <button type="button" onClick={limpiar}>
            Limpiar
          </button>
        </div>

        {!formularioValido && (
          <p className="error">
            Completa todos los campos correctamente
          </p>
        )}
      </form>
    </section>
  );

  // =========================
  // UI CONFIRMACIÓN
  // =========================
  const Confirmacion = (
    <section className="card">
      <h1>✅ Pedido registrado</h1>
      <p><b>Cliente:</b> {cliente}</p>
      <p><b>Correo:</b> {correo}</p>
      <p><b>Servicio:</b> {tipoServicio}</p>
      <p><b>Prioridad:</b> {prioridad}</p>

      <button onClick={limpiar}>
        Registrar otro pedido
      </button>
    </section>
  );

  return (
    <main className="page">
      {registrado ? Confirmacion : Registro}
    </main>
  );
}
