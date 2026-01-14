/*Script para formulario de alumnos*/
const listaElementos = [];
const formulario = document.getElementById('formulario');
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const matriculaInput = document.getElementById('matricula');
const emailInput = document.getElementById('email');
const notasTextarea = document.getElementById('notas');
const erroresDiv = document.getElementById('errores');
const btnAgregar = document.getElementById('btnAgregar');
const btnLimpiarFormulario = document.getElementById('btnLimpiarFormulario');
const btnLimpiarLista = document.getElementById('btnLimpiarLista');
const listaElementosOl = document.getElementById('listaElementos');
const textoVacio = document.getElementById('textoVacio');

// Verificar que todos los elementos existen
if (!formulario || !nombreInput || !apellidoInput || !matriculaInput || !emailInput || !notasTextarea || !erroresDiv ||
    !btnAgregar || !btnLimpiarFormulario || !btnLimpiarLista || !listaElementosOl || !textoVacio) {
    console.error('Algunos elementos del DOM no se encontraron');
    throw new Error('Elementos del DOM faltantes');
}

function normalizarTexto(texto) {
    return texto.trim().toLowerCase().replace(/\s+/g, ' ');
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validar() {
    const nombre = normalizarTexto(nombreInput.value);
    const apellido = normalizarTexto(apellidoInput.value);
    const matricula = matriculaInput.value.trim();
    const email = emailInput.value.trim();
    const notas = normalizarTexto(notasTextarea.value);

    let mensajesError = [];

    if (nombre.length < 1) {
        mensajesError.push('El nombre no puede estar vacío.');
    }
    if (apellido.length < 1) {
        mensajesError.push('El apellido no puede estar vacío.');
    }
    if (!matricula || isNaN(matricula) || parseInt(matricula) <= 0) {
        mensajesError.push('La matrícula debe ser un número positivo.');
    }
    if (!validarEmail(email)) {
        mensajesError.push('El email no es válido.');
    }
    if (notas.length < 10) {
        mensajesError.push('Las notas deben tener al menos 10 caracteres.');
    }

    erroresDiv.innerHTML = mensajesError.map(msg => `<p>${msg}</p>`).join('');
    btnAgregar.disabled = mensajesError.length > 0;

    return mensajesError.length === 0;
}

function pintarPantalla() {
    listaElementosOl.innerHTML = '';
    textoVacio.style.display = listaElementos.length ? 'none' : 'block';
    listaElementos.forEach((elemento, index) => {
        const li = document.createElement('li');
        li.textContent = `#${index + 1} | Nombre: ${elemento.nombre} | Apellido: ${elemento.apellido} | Matrícula: ${elemento.matricula} | Email: ${elemento.email} | Notas: ${elemento.notas}`;
        listaElementosOl.appendChild(li);
    });
}

function limpiarFormulario() {
    nombreInput.value = '';
    apellidoInput.value = '';
    matriculaInput.value = '';
    emailInput.value = '';
    notasTextarea.value = '';
    erroresDiv.innerHTML = '';
    btnAgregar.disabled = true;
    nombreInput.focus();
}

function limpiarLista() {
    listaElementos.length = 0;
    pintarPantalla();
}

// Event listeners
[nombreInput, apellidoInput, matriculaInput, emailInput, notasTextarea].forEach(input => {
    input.addEventListener('input', validar);
});

btnLimpiarFormulario.addEventListener('click', limpiarFormulario);
btnLimpiarLista.addEventListener('click', limpiarLista);

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validar()) return;

    listaElementos.push({
        nombre: normalizarTexto(nombreInput.value),
        apellido: normalizarTexto(apellidoInput.value),
        matricula: matriculaInput.value.trim(),
        email: emailInput.value.trim(),
        notas: normalizarTexto(notasTextarea.value),
    });
    limpiarFormulario();
    pintarPantalla();
});

// Inicial
validar();
pintarPantalla();


