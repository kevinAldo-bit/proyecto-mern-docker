// Modelo de Nota
// Define reglas de negocio y estructura propia
const mongoose = require('mongoose');

const esquemaNota = new mongoose.Schema(
    {
        contenido: {
            type: String,
            required: [true, 'El contenido es obligatorio'],
            trim: true,
            minlength: [5, 'El contenido debe tener al menos 5 caracteres']
        },
        importante: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Nota', esquemaNota);
