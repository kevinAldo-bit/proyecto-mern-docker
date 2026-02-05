// Script para conectar a MongoDB
// Incluye fallback: si falla la conexión, la API no se levanta
const mongoose = require('mongoose');

async function conectarBaseDeDatos(uriMongo) {
    try {
        await mongoose.connect(uriMongo);
        console.log("✅ Conexión exitosa a MongoDB");
    } catch (error) {
        console.error("❌ Error de conexión a MongoDB:", error.message);
        console.error("La API no puede funcionar sin base de datos");
        process.exit(1); // Fallback: detiene la API si no hay BD
    }
}

module.exports = conectarBaseDeDatos;
