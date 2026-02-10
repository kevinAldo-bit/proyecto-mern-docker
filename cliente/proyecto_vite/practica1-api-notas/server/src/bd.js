const mongoose = require('mongoose');

const conectarBaseDeDatos = async (uri) => {
    try {
        await mongoose.connect(uri || 'mongodb://127.0.0.1:27017/mi_tarea_api');
        console.log('>>> [Base de Datos] Conexión establecida con éxito');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
};

module.exports = conectarBaseDeDatos;