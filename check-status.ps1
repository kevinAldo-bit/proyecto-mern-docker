# Script para verificar el estado del proyecto MERN
# Dashboard simple en consola

Write-Host "=== Dashboard de Estado del Proyecto MERN ===" -ForegroundColor Cyan
Write-Host ""

# Verificar contenedores Docker
Write-Host "Estado de Contenedores:" -ForegroundColor Yellow
docker-compose ps
Write-Host ""

# Verificar URLs
Write-Host "Verificando URLs:" -ForegroundColor Yellow

# Backend
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000" -TimeoutSec 5
    Write-Host "Backend (localhost:5000): OK - Status $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "Backend (localhost:5000): ERROR - $($_.Exception.Message)" -ForegroundColor Red
}

# Frontend
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 5
    Write-Host "Frontend (localhost:3000): OK - Status $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "Frontend (localhost:3000): ERROR - $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Fin del Dashboard ===" -ForegroundColor Cyan