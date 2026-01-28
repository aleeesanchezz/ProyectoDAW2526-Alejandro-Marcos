#!/bin/bash

# Script de verificación post-despliegue
# Ejecutar después de: docker-compose up -d

echo "================================"
echo "🔍 VERIFICACIÓN POST-DESPLIEGUE"
echo "================================"
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

DOMAIN="https://ecotrack-pi.duckdns.org"

# 1. Verificar que los contenedores están corriendo
echo -e "${YELLOW}1. Verificando contenedores...${NC}"
if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}✓ Contenedores corriendo${NC}"
else
    echo -e "${RED}✗ Contenedores no están corriendo${NC}"
    exit 1
fi
echo ""

# 2. Verificar salud del backend
echo -e "${YELLOW}2. Verificando salud del backend...${NC}"
BACKEND_HEALTH=$(curl -s -k "${DOMAIN}/api/actuator/health" | grep -o '"status":"[^"]*"')
if [[ $BACKEND_HEALTH == *"UP"* ]]; then
    echo -e "${GREEN}✓ Backend healthy${NC}"
else
    echo -e "${RED}✗ Backend no responde correctamente${NC}"
    echo "Response: $BACKEND_HEALTH"
fi
echo ""

# 3. Verificar base de datos
echo -e "${YELLOW}3. Verificando base de datos...${NC}"
if docker-compose exec -T mysql mysqladmin ping -u root -p"$(grep MYSQL_ROOT_PASSWORD .env | cut -d= -f2)" >/dev/null 2>&1; then
    echo -e "${GREEN}✓ MySQL respondiendo${NC}"
else
    echo -e "${RED}✗ MySQL no responde${NC}"
fi
echo ""

# 4. Verificar logs de errores en backend
echo -e "${YELLOW}4. Verificando logs del backend...${NC}"
ERROR_COUNT=$(docker-compose logs backend | grep -i "error\|exception" | wc -l)
if [ "$ERROR_COUNT" -eq 0 ]; then
    echo -e "${GREEN}✓ Sin errores detectados en backend${NC}"
else
    echo -e "${YELLOW}⚠ $ERROR_COUNT líneas con 'error' encontradas${NC}"
    echo "Revisar con: docker-compose logs backend | grep -i error"
fi
echo ""

# 5. Test API
echo -e "${YELLOW}5. Verificando acceso a API...${NC}"
API_RESPONSE=$(curl -s -k -w "%{http_code}" "${DOMAIN}/api/usuarios")
HTTP_CODE="${API_RESPONSE: -3}"
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "401" ]; then
    echo -e "${GREEN}✓ API responde con HTTP $HTTP_CODE${NC}"
else
    echo -e "${RED}✗ API responde con HTTP $HTTP_CODE (esperado 200 o 401)${NC}"
fi
echo ""

# 6. Test Frontend
echo -e "${YELLOW}6. Verificando acceso al Frontend...${NC}"
FRONTEND_RESPONSE=$(curl -s -k -w "%{http_code}" "${DOMAIN}/")
HTTP_CODE="${FRONTEND_RESPONSE: -3}"
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✓ Frontend responde con HTTP $HTTP_CODE${NC}"
else
    echo -e "${RED}✗ Frontend responde con HTTP $HTTP_CODE (esperado 200)${NC}"
fi
echo ""

# 7. Test HTTPS/Certificado
echo -e "${YELLOW}7. Verificando certificado HTTPS...${NC}"
CERT_EXPIRY=$(echo | openssl s_client -servername ecotrack-pi.duckdns.org -connect "${DOMAIN/https:\/\//}:443" 2>/dev/null | openssl x509 -noout -dates 2>/dev/null | grep notAfter | cut -d= -f2)
if [ ! -z "$CERT_EXPIRY" ]; then
    echo -e "${GREEN}✓ Certificado válido${NC}"
    echo "  Expira: $CERT_EXPIRY"
else
    echo -e "${RED}✗ No se pudo verificar certificado${NC}"
fi
echo ""

echo "================================"
echo "✅ VERIFICACIÓN COMPLETADA"
echo "================================"
echo ""
echo "🌐 Acceso:"
echo "  URL: ${DOMAIN}"
echo "  Frontend: ${DOMAIN}/"
echo "  Backend: ${DOMAIN}/api/actuator/health"
echo ""
echo "📋 Logs útiles:"
echo "  Backend:  docker-compose logs backend -f"
echo "  Frontend: docker-compose logs frontend -f"
echo "  MySQL:    docker-compose logs mysql -f"
echo "  Caddy:    docker-compose logs caddy -f"
echo ""
echo "🐛 Debugging:"
echo "  Entrar a backend:  docker-compose exec backend /bin/bash"
echo "  Entrar a MySQL:    docker-compose exec mysql mysql -u ecotrack_user -p"
echo ""
