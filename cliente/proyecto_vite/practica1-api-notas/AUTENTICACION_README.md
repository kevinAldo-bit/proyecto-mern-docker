# Sistema de Login y Gestión de Tareas con JWT

## 🚀 Características Implementadas

### Backend (Node.js + Express + MongoDB)
- ✅ **Autenticación con JWT**: Tokens seguros para mantener sesiones
- ✅ **Registro de usuarios**: Validación de email y contraseña
- ✅ **Login de usuarios**: Autenticación contra base de datos
- ✅ **Encriptación de contraseñas**: Con bcryptjs
- ✅ **Rutas protegidas**: Las tareas requieren autenticación
- ✅ **Middleware de verificación**: Protege endpoints con JWT

### Frontend (React + Vite)
- ✅ **Componente Login**: Interfaz para iniciar sesión
- ✅ **Componente Registro**: Crear nuevas cuentas de usuario
- ✅ **Almacenamiento de sesión**: JWT guardado en localStorage
- ✅ **Gestión de tareas autenticadas**: Solo usuarios registrados
- ✅ **Cerrar sesión**: Limpiar token y datos locales
- ✅ **Validación de campos**: Cliente y servidor

## 📋 Endpoints de la API

### Autenticación (`/api/auth`)
```
POST /api/auth/registro
Body: { nombre, email, password }
Response: { token, usuario }

POST /api/auth/login
Body: { email, password }
Response: { token, usuario }

GET /api/auth/me
Headers: Authorization: Bearer <token>
Response: Usuario completo
```

### Tareas (`/api/tareas`) - Requieren token JWT
```
GET /api/tareas
Headers: Authorization: Bearer <token>

POST /api/tareas
Headers: Authorization: Bearer <token>
Body: { descripcion }
```

## 🔧 Instalación y Ejecución

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd mi-frontend
npm run dev
```

## 📱 Uso de la Aplicación

1. **Primera vez**: Haz clic en "Regístrate aquí"
2. **Ingresa tus datos**: Nombre, email y contraseña (mín 6 caracteres)
3. **Inicia sesión**: Se guardará tu token en localStorage automáticamente
4. **Gestiona tus tareas**: Agrega, visualiza y organiza tus tareas
5. **Cierra sesión**: Botón en la esquina superior derecha

## 🔐 Seguridad

- Las contraseñas se hashean con bcryptjs (salt rounds: 10)
- Los tokens JWT expiran en 7 días
- Validación de email en el servidor
- Middleware de autenticación en todas las rutas protegidas

## 📦 Dependencias Instaladas

**Backend:**
- express
- cors
- mongoose
- bcryptjs (✨ nuevo)
- jsonwebtoken (✨ nuevo)
- dotenv

**Frontend:**
- react
- react-dom
- vite (bundler)

## 🎯 Flujo de Autenticación

```
1. Usuario se registra/inicia sesión
   ↓
2. Servidor valida credenciales
   ↓
3. Si es válido, genera JWT
   ↓
4. Cliente guarda JWT en localStorage
   ↓
5. Cada solicitud incluye: Authorization: Bearer <token>
   ↓
6. Servidor verifica token en middleware
   ↓
7. Si es válido, permite acceso al recurso
```

## 🐛 Troubleshooting

**"Token no proporcionado"**
- Asegúrate de estar autenticado
- El token debe incluirse en el header de Authorization

**"Error de conectividad"**
- Verifica que MongoDB esté corriendo
- Verifica que el backend esté en puerto 3000

**"Las contraseñas no coinciden"**
- Escribe la misma contraseña en ambos campos

## 📝 Archivo .env Recomendado

```
PUERTO=3000
URI_MONGO=mongodb://127.0.0.1:27017/mi_tarea_api
JWT_SECRET=tu_clave_secreta_super_segura_2025
```

---

¡Tu sistema de autenticación está listo! 🎉
