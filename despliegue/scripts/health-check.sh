#!/bin/bash
# ============================================
# Health Check Script
# Monitors all services
# ============================================

set -e

echo "=========================================="
echo "ECOTRACK SERVICES HEALTH CHECK"
echo "=========================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}✗ Docker is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker installed${NC}"

# Check containers
echo ""
echo "Checking containers status..."
echo ""

containers=("ecotrack-mysql" "ecotrack-backend" "ecotrack-frontend" "ecotrack-caddy")

for container in "${containers[@]}"; do
    if docker ps -a --format '{{.Names}}' | grep -q "^${container}$"; then
        if docker ps --format '{{.Names}}' | grep -q "^${container}$"; then
            echo -e "${GREEN}✓ $container is running${NC}"
        else
            echo -e "${YELLOW}⚠ $container is stopped${NC}"
        fi
    else
        echo -e "${RED}✗ $container does not exist${NC}"
    fi
done

# Check connectivity
echo ""
echo "Checking service connectivity..."
echo ""

# MySQL
if docker exec ecotrack-mysql mysql -h localhost -u root -p"${MYSQL_ROOT_PASSWORD}" -e "SELECT 1" &>/dev/null; then
    echo -e "${GREEN}✓ MySQL is responsive${NC}"
else
    echo -e "${RED}✗ MySQL is not responsive${NC}"
fi

# Backend
if curl -s http://localhost:8080/api/actuator/health > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Backend (Spring Boot) is responsive${NC}"
else
    echo -e "${RED}✗ Backend (Spring Boot) is not responsive${NC}"
fi

# Frontend
if curl -s http://localhost/health > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Frontend (Angular) is responsive${NC}"
else
    echo -e "${RED}✗ Frontend (Angular) is not responsive${NC}"
fi

# Caddy
if curl -s https://ecotrack-pi.duckdns.org > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Caddy (Proxy) is responsive${NC}"
else
    echo -e "${YELLOW}⚠ Caddy (Proxy) - check SSL certificate or domain${NC}"
fi

echo ""
echo "=========================================="
echo "Health check completed!"
echo "=========================================="
