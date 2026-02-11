const express = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../modelos/usuario');
const { verificarToken } = require('../middleware/autenticacion');
const router = express.Router();

const generarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'tu_clave_secreta', {
        expiresIn: '7d'
    });
};

// Registro de usuario
router.post('/registro', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Validaciones
        if (!nombre || !email || !password) {
            return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
        }

        if (password.length < 6) {
            return res.status(400).json({ mensaje: 'La contraseña debe tener al menos 6 caracteres' });
        }

        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El email ya está registrado' });
        }

        // Crear nuevo usuario
        const nuevoUsuario = new Usuario({ nombre, email, password });
        await nuevoUsuario.save();

        const token = generarToken(nuevoUsuario._id);
        
        console.log(`>>> Éxito: Nuevo usuario registrado: ${email}`);
        return res.status(201).json({
            mensaje: 'Usuario registrado exitosamente',
            token,
            usuario: {
                id: nuevoUsuario._id,
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email
            }
        });
    } catch (error) {
        console.error('Error en registro:', error);
        return res.status(500).json({ mensaje: 'Error al registrar usuario' });
    }
});

// Login de usuario
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validaciones
        if (!email || !password) {
            return res.status(400).json({ mensaje: 'Email y contraseña son requeridos' });
        }

        // Buscar usuario por email
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }

        // Comparar contraseña
        const coincidePassword = await usuario.compararPassword(password);
        if (!coincidePassword) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }

        const token = generarToken(usuario._id);
        
        console.log(`>>> Éxito: Usuario autenticado: ${email}`);
        return res.status(200).json({
            mensaje: 'Login exitoso',
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        });
    } catch (error) {
        console.error('Error en login:', error);
        return res.status(500).json({ mensaje: 'Error al iniciar sesión' });
    }
});

// Verificar token y obtener datos del usuario
router.get('/me', verificarToken, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        return res.status(200).json(usuario);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        return res.status(500).json({ mensaje: 'Error al obtener datos del usuario' });
    }
});

module.exports = router;
