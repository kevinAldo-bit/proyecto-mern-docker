// Rutas de la API de notas
// POST y GET con validaciones y fallbacks

const express = require('express');
const Nota = require('../modelos/notas');

const router = express.Router();

// Crear nota
router.post("/", async (req, res) => {
    try {
        const { contenido, importante } = req.body;

        // Regla de negocio
        if (!contenido || contenido.trim().length < 5) {
            return res.status(400).json({
                mensaje: "El contenido es obligatorio y debe tener al menos 5 caracteres."
            });
        }

        const nuevaNota = await Nota.create({
            contenido: contenido.trim(),
            importante: importante ?? false
        });

        return res.status(201).json({
            mensaje: "Nota creada correctamente",
            nota: nuevaNota
        });

    } catch (error) {
        console.error("Error al crear nota:", error);
        return res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
});

// Obtener todas las notas
router.get("/", async (req, res) => {
    try {
        const notas = await Nota.find().sort({ importante: -1, createdAt: -1 });

        return res.status(200).json({
            total: notas.length,
            notas
        });

    } catch (error) {
        console.error("Error al obtener notas:", error);
        return res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
});

module.exports = router;
