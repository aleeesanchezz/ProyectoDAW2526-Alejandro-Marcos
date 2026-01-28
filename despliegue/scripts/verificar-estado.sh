#!/bin/bash

# ============================================
# EcoTrack - Verificación de Estado (Bash/Ubuntu)
# ============================================

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}================================${NC}"
echo -e "${CYAN}VERIFICACIÓN DE ESTADO - ECOTRACK${NC}"
echo -e "${CYAN}================================${NC}"
echo ""

# Cambiar al directorio del proyecto
SCRIPT_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$(dirname "$SCRIPT_PATH")")"
cd "$PROJECT_ROOT" || exit 1

# Función para verificar estado de contenedor
check_container() {
    local container_name=$1
    local status=$(docker ps -a --filter "name=$container_name" --format "{{.Status}}" 2>/dev/null)
    
    if [ -z "$status" ]; then
        echo -e "${RED}[ERROR] $container_name no existe${NC}"
        return 1
    elif echo "$status" | grep -q "Up"; then
        echo -e "${GREEN}[OK] $container_name está corriendo${NC}"
        return 0
    else
        echo -e "${RED}[ERROR] $container_name está detenido: $status${NC}"
        return 1
    fi
}

# Verificar contenedores
echo -e "${YELLOW}Verificando contenedores...${NC}"
echo ""

MYSQL_OK=0
BACKEND_OK=0
FRONTEND_OK=0
CADDY_OK=0

check_container "ecotrack-mysql" && MYSQL_OK=1
check_container "ecotrack-backend" && BACKEND_OK=1
check_container "ecotrack-frontend" && FRONTEND_OK=1
check_container "ecotrack-caddy" && CADDY_OK=1

echo ""

# Verificar health del backend
if [ $BACKEND_OK -eq 1 ]; then
    echo -e "${YELLOW}Verificando health del backend...${NC}"
    
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/api/actuator/health 2>/dev/null || echo "000")
    HEALTH_RESPONSE=$(curl -s http://localhost:8080/api/actuator/health 2>/dev/null)
    
    if [ "$HTTP_CODE" = "200" ]; then
        STATUS=$(echo "$HEALTH_RESPONSE" | grep -o '"status":"[^"]*"' || echo '"status":"UNKNOWN"')
        if echo "$STATUS" | grep -q "UP"; then
            echo -e "${GREEN}[OK] Backend está healthy${NC}"
        else
            echo -e "${YELLOW}[ADVERTENCIA] Backend responde pero no está UP: $STATUS${NC}"
        fi
    else
        echo -e "${RED}[ERROR] Backend no responde en el health check${NC}"
        echo -e "${CYAN}       URL: http://localhost:8080/api/actuator/health${NC}"
    fi
    echo ""
fi

# Verificar conexión a MySQL
if [ $MYSQL_OK -eq 1 ]; then
    echo -e "${YELLOW}Verificando MySQL...${NC}"
    
    if docker exec ecotrack-mysql mysqladmin ping -h localhost 2>/dev/null | grep -q "mysqld is alive"; then
        echo -e "${GREEN}[OK] MySQL está respondiendo${NC}"
    else
        echo -e "${RED}[ERROR] MySQL no responde correctamente${NC}"
    fi
    echo ""
fi

# Verificar frontend
if [ $FRONTEND_OK -eq 1 ]; then
    echo -e "${YELLOW}Verificando Frontend...${NC}"
    
    if docker exec ecotrack-frontend wget --quiet --tries=1 --spider http://localhost:80/ 2>/dev/null; then
        echo -e "${GREEN}[OK] Frontend está respondiendo${NC}"
    else
        echo -e "${RED}[ERROR] Frontend no responde${NC}"
    fi
    echo ""
fi

# Verificar Caddy
if [ $CADDY_OK -eq 1 ]; then
    echo -e "${YELLOW}Verificando Caddy (Proxy Inverso)...${NC}"
    
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost 2>/dev/null || echo "000")
    
    if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "301" ] || [ "$HTTP_CODE" = "302" ]; then
        echo -e "${GREEN}[OK] Caddy está sirviendo el frontend${NC}"
    else
        echo -e "${YELLOW}[ADVERTENCIA] No se pudo verificar Caddy en http://localhost${NC}"
        echo -e "${CYAN}               Esto es normal si Caddy está configurado solo para HTTPS${NC}"
    fi
    echo ""
fi

# Resumen
echo -e "${CYAN}================================${NC}"
echo -e "${CYAN}RESUMEN${NC}"
echo -e "${CYAN}================================${NC}"
echo ""

if [ $MYSQL_OK -eq 1 ] && [ $BACKEND_OK -eq 1 ] && [ $FRONTEND_OK -eq 1 ] && [ $CADDY_OK -eq 1 ]; then
    echo -e "${GREEN}Todos los servicios están operativos!${NC}"
else
    echo -e "${YELLOW}Algunos servicios tienen problemas. Revisa los logs:${NC}"
    echo "  docker-compose -f despliegue/docker-compose.yml logs"
fi

echo ""
echo -e "${CYAN}Para ver logs detallados:${NC}"
echo "  docker-compose -f despliegue/docker-compose.yml logs -f [servicio]"
echo ""
echo -e "${CYAN}Servicios disponibles: mysql, backend, frontend, caddy${NC}"
echo ""
