#!/bin/bash

# ============================================
# EcoTrack - Detener Servicios (Bash/Ubuntu)
# ============================================

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

REMOVE_VOLUMES=false

# Procesar argumentos
while [[ $# -gt 0 ]]; do
    case $1 in
        --remove-volumes|-rv)
            REMOVE_VOLUMES=true
            shift
            ;;
        *)
            shift
            ;;
    esac
done

echo -e "${CYAN}================================${NC}"
echo -e "${CYAN}DETENER SERVICIOS - ECOTRACK${NC}"
echo -e "${CYAN}================================${NC}"
echo ""

# Cambiar al directorio del proyecto
SCRIPT_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$(dirname "$SCRIPT_PATH")")"
cd "$PROJECT_ROOT" || exit 1

echo -e "${CYAN}Directorio del proyecto: $PROJECT_ROOT${NC}"
echo ""

# Verificar si hay contenedores corriendo
if ! docker-compose -f despliegue/docker-compose.yml ps -q 2>/dev/null | grep -q .; then
    echo -e "${YELLOW}No hay servicios corriendo.${NC}"
    exit 0
fi

# Advertencia si se van a eliminar volúmenes
if [ "$REMOVE_VOLUMES" = true ]; then
    echo -e "${RED}ADVERTENCIA: Se eliminarán los volúmenes (datos de la base de datos)${NC}"
    echo ""
    read -p "¿Estás seguro? Escribe 'SI' para confirmar: " confirm
    
    if [ "$confirm" != "SI" ]; then
        echo -e "${YELLOW}Operación cancelada.${NC}"
        exit 0
    fi
    echo ""
fi

# Detener servicios
echo -e "${YELLOW}Deteniendo servicios...${NC}"
echo ""

if [ "$REMOVE_VOLUMES" = true ]; then
    docker-compose -f despliegue/docker-compose.yml down -v
else
    docker-compose -f despliegue/docker-compose.yml down
fi

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}[OK] Servicios detenidos correctamente${NC}"
    
    if [ "$REMOVE_VOLUMES" = true ]; then
        echo -e "${CYAN}[INFO] Volúmenes eliminados${NC}"
    else
        echo -e "${CYAN}[INFO] Los datos se han preservado en los volúmenes${NC}"
    fi
else
    echo ""
    echo -e "${RED}[ERROR] Hubo un problema al detener los servicios${NC}"
    exit 1
fi

echo ""
echo -e "${CYAN}Para volver a iniciar los servicios:${NC}"
echo "  ./despliegue/scripts/deploy.sh"
echo ""

if [ "$REMOVE_VOLUMES" = false ]; then
    echo -e "${YELLOW}Para detener y eliminar TODOS los datos (incluida la BD):${NC}"
    echo "  ./despliegue/scripts/stop.sh --remove-volumes"
    echo ""
fi
