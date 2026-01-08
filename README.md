# Proyecto MERN Mínimo con Docker

Este es un proyecto mínimo basado en el stack MERN (MongoDB, Express, React, Node.js) utilizando contenedores Docker.

## Estructura del Proyecto

- `backend/`: Servidor Express.js con conexión a MongoDB
- `frontend/`: Aplicación React con Vite
- `docker-compose.yml`: Orquestación de contenedores

## Requisitos

- Docker
- Docker Compose

## Instalación y Ejecución

1. Clona el repositorio
2. Navega al directorio del proyecto
3. Ejecuta `docker-compose up --build`

Los servicios estarán disponibles en:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: mongodb://admin:password@localhost:27017/mern (no expuesto externamente)

## Verificar Estado del Proyecto

Ejecuta el script `check-status.ps1` para ver un dashboard en consola que verifica el estado de los contenedores y las URLs de los servicios.

```powershell
.\check-status.ps1
```

## Desarrollo

Para desarrollo local, puedes ejecutar los servicios individualmente:

- Backend: `cd backend && npm run dev`
- Frontend: `cd frontend && npm run dev`

Asegúrate de tener MongoDB corriendo localmente o ajusta la URI.