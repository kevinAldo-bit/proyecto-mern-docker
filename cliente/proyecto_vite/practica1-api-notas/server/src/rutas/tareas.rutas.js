const express = require('express');
const Tarea = require('../modelos/tarea');
const { verificarToken } = require('../middleware/autenticacion');
const router = express.Router();

// Obtener todas las tareas (requiere token)
router.get("/", verificarToken, async (req, res) => {
    try {
        console.log(">>> Solicitud GET: Recuperando lista de tareas...");
        const tareas = await Tarea.find().sort({ createdAt: -1 });
        return res.status(200).json(tareas);
    } catch (error) {
        console.error("Error al recuperar tareas:", error);
        return res.status(500).json({ mensaje: "Error en el servidor" });
    }
});

// Crear una tarea (requiere token)
router.post("/", verificarToken, async (req, res) => {
    try {
        const { descripcion } = req.body;
        if (!descripcion || descripcion.length < 3) {
            console.log(">>> Advertencia: Intento de registro con descripción corta.");
            return res.status(400).json({ mensaje: "Descripción demasiado corta." });
        }
        
        const nuevaTarea = await Tarea.create({ descripcion });
        console.log(">>> Éxito: Tarea registrada en BD:", nuevaTarea.descripcion);
        return res.status(201).json(nuevaTarea);
    } catch (error) {
        console.error("Error al guardar tarea:", error);
        return res.status(500).json({ mensaje: "Error al procesar el registro" });
    }
});

module.exports = router;