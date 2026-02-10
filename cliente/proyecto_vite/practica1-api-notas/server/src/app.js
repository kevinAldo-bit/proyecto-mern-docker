const express = require('express');
const cors = require('cors');
require('dotenv').config();
const rutasTareas = require('./rutas/tareas.rutas'); // Cambiado
const conectarBaseDeDatos = require('./bd');

const app = express();
app.use(cors());
app.use(express.json());

// Ahora el endpoint oficial es /api/tareas
app.use('/api/tareas', rutasTareas); 

const PUERTO = process.env.PUERTO || 3000;

conectarBaseDeDatos(process.env.URI_MONGO).then(() => {
    app.listen(PUERTO, () => {
        console.log(`[Sistema] API Activa en puerto ${PUERTO}`);
    });
});