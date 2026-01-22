/* eslint-env browser */
/* Práctica 05 - Control de Alumnos */

const alumnos = [];
let indiceEnEdicion = null;

const formulario = document.getElementById("formularioAlumno");
const nombreAlumno = document.getElementById("nombreAlumno");
const matriculaAlumno = document.getElementById("matriculaAlumno");
const carreraAlumno = document.getElementById("carreraAlumno");
const textoError = document.getElementById("textoError");
const mensaje = document.getElementById("mensaje");
const btnGuardar = document.getElementById("btnGuardar");
const listaAlumnos = document.getElementById("listaAlumnos");
const textoVacio = document.getElementById("textoVacio");

function normalizar(texto) {
  return texto.trim().replace(/\s+/g, " ");
}

function validar() {
  const nombre = normalizar(nombreAlumno.value);
  const matricula = normalizar(matriculaAlumno.value);
  const carrera = normalizar(carreraAlumno.value);

  let error = "";

  if (nombre.length < 5) {
    error = "El nombre debe tener al menos 5 caracteres.";
  } else if (!/^[0-9]{6,}$/.test(matricula)) {
    error = "La matrícula debe ser numérica y mínimo 6 dígitos.";
  } else if (carrera.length < 3) {
    error = "La carrera no puede estar vacía.";
  }

  textoError.textContent = error;
  btnGuardar.disabled = Boolean(error);
  return !error;
}

function limpiarFormulario() {
  formulario.reset();
  indiceEnEdicion = null;
  btnGuardar.textContent = "Guardar";
  btnGuardar.disabled = true;
}

function pintar() {
  listaAlumnos.textContent = "";
  textoVacio.style.display = alumnos.length ? "none" : "block";

  alumnos.forEach((alumno, i) => {
    const li = document.createElement("li");

    const info = document.createElement("p");
    info.className = "texto-chico";
    info.textContent = `${alumno.nombre} | ${alumno.matricula} | ${alumno.carrera}`;

    const acciones = document.createElement("div");
    acciones.className = "fila-acciones";

    const editar = document.createElement("button");
    editar.textContent = "Editar ✏️";
    editar.dataset.indice = i;
    editar.dataset.accion = "editar";

    const eliminar = document.createElement("button");
    eliminar.textContent = "Eliminar 🗑️";
    eliminar.className = "boton-peligro";
    eliminar.dataset.indice = i;
    eliminar.dataset.accion = "eliminar";

    acciones.append(editar, eliminar);
    li.append(info, acciones);
    listaAlumnos.appendChild(li);
  });
}

listaAlumnos.addEventListener("click", (e) => {
  const boton = e.target.closest("button");
  if (!boton) return;

  const indice = Number(boton.dataset.indice);

  if (boton.dataset.accion === "eliminar") {
    if (!confirm("¿Eliminar alumno?")) return;
    alumnos.splice(indice, 1);
    pintar();
    mensaje.textContent = "Alumno eliminado.";
  }

  if (boton.dataset.accion === "editar") {
    const alumno = alumnos[indice];
    indiceEnEdicion = indice;

    nombreAlumno.value = alumno.nombre;
    matriculaAlumno.value = alumno.matricula;
    carreraAlumno.value = alumno.carrera;

    btnGuardar.textContent = "Actualizar";
    validar();
    mensaje.textContent = "Editando alumno.";
  }
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validar()) return;

  const alumno = {
    nombre: normalizar(nombreAlumno.value),
    matricula: normalizar(matriculaAlumno.value),
    carrera: normalizar(carreraAlumno.value),
  };

  if (indiceEnEdicion === null) {
    alumnos.push(alumno);
    mensaje.textContent = "Alumno registrado.";
  } else {
    alumnos[indiceEnEdicion] = alumno;
    mensaje.textContent = "Alumno actualizado.";
  }

  limpiarFormulario();
  pintar();
});

nombreAlumno.addEventListener("input", validar);
matriculaAlumno.addEventListener("input", validar);
carreraAlumno.addEventListener("input", validar);

pintar();
