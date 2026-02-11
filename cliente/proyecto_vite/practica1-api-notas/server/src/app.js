const express = require('express');
const cors = require('cors');
require('dotenv').config();
const rutasTareas = require('./rutas/tareas.rutas');
const rutasAuth = require('./rutas/auth.rutas');
const conectarBaseDeDatos = require('./bd');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.use('/api/auth', rutasAuth);

// Rutas de tareas (protegidas con JWT)
app.use('/api/tareas', rutasTareas); 

const PUERTO = process.env.PUERTO || 3000;

conectarBaseDeDatos(process.env.URI_MONGO).then(() => {
    app.listen(PUERTO, () => {
        console.log(`[Sistema] API Activa en puerto ${PUERTO}`);
    });
});