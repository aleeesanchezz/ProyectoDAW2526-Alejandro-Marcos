#!/bin/bash

# ============================================
# EcoTrack - Script de Despliegue (Bash/Ubuntu)
# ============================================

# Colores para output
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${CYAN}================================${NC}"
echo -e "${CYAN}ECOTRACK - DESPLIEGUE${NC}"
echo -e "${CYAN}================================${NC}"
echo ""

# Verificar que Docker está instalado
echo -e "${YELLOW}Verificando Docker...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}[ERROR] Docker no está instalado${NC}"
    exit 1
fi
echo -e "${GREEN}[OK] Docker instalado${NC}"

# Verificar que Docker Compose está instalado
echo -e "${YELLOW}Verificando Docker Compose...${NC}"
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}[ERROR] Docker Compose no está instalado${NC}"
    exit 1
fi
echo -e "${GREEN}[OK] Docker Compose instalado${NC}"

# Cambiar al directorio del proyecto
SCRIPT_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$(dirname "$SCRIPT_PATH")")"
cd "$PROJECT_ROOT" || exit 1

echo ""
echo -e "${CYAN}Directorio del proyecto: $PROJECT_ROOT${NC}"
echo ""

# Verificar archivo .env
if [ ! -f "despliegue/.env" ]; then
    echo -e "${YELLOW}[ADVERTENCIA] Archivo .env no encontrado${NC}"
    echo -e "${YELLOW}Copiando .env.example a .env...${NC}"
    cp despliegue/.env.example despliegue/.env
    echo -e "${CYAN}[INFO] Edita el archivo despliegue/.env con tus configuraciones${NC}"
    echo ""
    
    read -p "¿Deseas continuar con los valores por defecto? (S/N): " response
    if [[ "$response" != "S" && "$response" != "s" ]]; then
        echo -e "${YELLOW}Despliegue cancelado. Configura el archivo .env y vuelve a ejecutar.${NC}"
        exit 0
    fi
fi

echo ""
echo -e "${CYAN}================================${NC}"
echo -e "${CYAN}CONSTRUYENDO IMÁGENES${NC}"
echo -e "${CYAN}================================${NC}"
echo ""

# Construir imágenes
docker-compose -f despliegue/docker-compose.yml build

if [ $? -ne 0 ]; then
    echo -e "${RED}[ERROR] Falló la construcción de imágenes${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}[OK] Imágenes construidas exitosamente${NC}"
echo ""

echo -e "${CYAN}================================${NC}"
echo -e "${CYAN}INICIANDO SERVICIOS${NC}"
echo -e "${CYAN}================================${NC}"
echo ""

# Iniciar servicios
docker-compose -f despliegue/docker-compose.yml up -d

if [ $? -ne 0 ]; then
    echo -e "${RED}[ERROR] Falló el inicio de servicios${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}[OK] Servicios iniciados${NC}"
echo ""

echo -e "${CYAN}================================${NC}"
echo -e "${CYAN}VERIFICANDO ESTADO${NC}"
echo -e "${CYAN}================================${NC}"
echo ""

# Esperar un momento para que los servicios se inicien
echo -e "${YELLOW}Esperando que los servicios se inicien...${NC}"
sleep 10

# Mostrar estado de los contenedores
docker-compose -f despliegue/docker-compose.yml ps

echo ""
echo -e "${CYAN}================================${NC}"
echo -e "${CYAN}DESPLIEGUE COMPLETADO${NC}"
echo -e "${CYAN}================================${NC}"
echo ""
echo -e "${CYAN}Para ver los logs en tiempo real:${NC}"
echo "  docker-compose -f despliegue/docker-compose.yml logs -f"
echo ""
echo -e "${CYAN}Para detener los servicios:${NC}"
echo "  docker-compose -f despliegue/docker-compose.yml down"
echo ""
echo -e "${CYAN}Para verificar el estado:${NC}"
echo "  docker-compose -f despliegue/docker-compose.yml ps"
echo ""

# Verificar health del backend (después de unos segundos)
echo -e "${YELLOW}Esperando que el backend esté listo...${NC}"
MAX_ATTEMPTS=40
ATTEMPT=0
BACKEND_READY=false

while [ $ATTEMPT -lt $MAX_ATTEMPTS ] && [ "$BACKEND_READY" = false ]; do
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/api/actuator/health 2>/dev/null || echo "000")
    
    if [ "$HTTP_CODE" = "200" ]; then
        BACKEND_READY=true
        echo -e "${GREEN}[OK] Backend está listo!${NC}"
    else
        ATTEMPT=$((ATTEMPT + 1))
        echo -n "."
        sleep 2
    fi
done

echo ""

if [ "$BACKEND_READY" = false ]; then
    echo -e "${YELLOW}[ADVERTENCIA] El backend tardó más de lo esperado en estar listo${NC}"
    echo -e "${YELLOW}Verifica los logs: docker-compose -f despliegue/docker-compose.yml logs backend${NC}"
else
    echo ""
    echo -e "${GREEN}Acceso a la aplicación:${NC}"
    echo "  Frontend: http://localhost (o tu dominio configurado)"
    echo "  API: http://localhost/api (o tu dominio configurado)"
    echo "  Health Check: http://localhost:8080/api/actuator/health"
fi

echo ""
