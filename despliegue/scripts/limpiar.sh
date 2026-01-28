#!/bin/bash

# Script de limpieza completa y deploy funcional
# EcoTrack - Limpieza sin residuos

set -e

echo "=========================================="
echo "ECOTRACK - SCRIPT DE LIMPIEZA COMPLETA"
echo "=========================================="
echo ""

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
COMPOSE_FILE="$REPO_ROOT/despliegue/docker-compose.yml"
BACKEND_DIR="$REPO_ROOT/Backend/ecotrack-backend/ecotrack-backend"

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir con color
print_step() {
    echo -e "${GREEN}[*]${NC} $1"
}

print_error() {
    echo -e "${RED}[!]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

# 1. Detener todos los contenedores
print_step "Deteniendo contenedores..."
if docker-compose -f "$COMPOSE_FILE" ps | grep -q "Up"; then
    docker-compose -f "$COMPOSE_FILE" down 2>/dev/null || true
    sleep 2
else
    print_warning "No hay contenedores corriendo"
fi

# 2. Eliminar volúmenes de Docker
print_step "Eliminando volúmenes de Docker..."
docker-compose -f "$COMPOSE_FILE" down -v 2>/dev/null || true
sleep 1

# 3. Eliminar imágenes de Docker del proyecto
print_step "Eliminando imágenes de Docker..."
docker image rm ecotrack-backend:latest 2>/dev/null || true
docker image rm ecotrack-frontend:latest 2>/dev/null || true
docker image rm ecotrack-mysql:latest 2>/dev/null || true

# 4. Limpiar artefactos de Maven del backend
print_step "Limpiando artefactos de Maven..."
if [ -d "$BACKEND_DIR" ]; then
    cd "$BACKEND_DIR"
    mvn clean -q 2>/dev/null || true
    cd "$REPO_ROOT"
fi

# 5. Eliminar node_modules del frontend (opcional pero recomendado)
print_step "Verificando dependencias del frontend..."
FRONTEND_DIR="$REPO_ROOT/Frontend/ecotrack"
if [ -d "$FRONTEND_DIR/node_modules" ]; then
    print_step "Limpiando node_modules del frontend..."
    rm -rf "$FRONTEND_DIR/node_modules" 2>/dev/null || true
fi

# 6. Limpiar Docker system
print_step "Limpiando sistema de Docker..."
docker system prune -f --volumes 2>/dev/null || true

echo ""
print_step "Limpieza completada exitosamente"
echo ""
echo "=========================================="
echo "Para hacer deploy limpio, ejecuta:"
echo "=========================================="
echo "bash $REPO_ROOT/despliegue/scripts/deploy.sh"
echo ""
