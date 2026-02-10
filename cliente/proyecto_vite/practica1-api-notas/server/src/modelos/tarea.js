const mongoose = require('mongoose');

const esquemaTarea = new mongoose.Schema({
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    completada: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Tarea', esquemaTarea);