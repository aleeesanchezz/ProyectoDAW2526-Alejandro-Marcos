#!/bin/bash
# ============================================
# Pre-Deployment Verification Script
# Verifies all configurations before deployment
# ============================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Counters
CHECKS_PASSED=0
CHECKS_FAILED=0
CHECKS_WARNINGS=0

echo -e "${BLUE}"
echo "=========================================="
echo "ECOTRACK PRE-DEPLOYMENT VERIFICATION"
echo "=========================================="
echo -e "${NC}"

# Helper functions
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} File exists: $1"
        ((CHECKS_PASSED++))
        return 0
    else
        echo -e "${RED}✗${NC} File not found: $1"
        ((CHECKS_FAILED++))
        return 1
    fi
}

check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} Directory exists: $1"
        ((CHECKS_PASSED++))
        return 0
    else
        echo -e "${RED}✗${NC} Directory not found: $1"
        ((CHECKS_FAILED++))
        return 1
    fi
}

check_command() {
    if command -v "$1" &> /dev/null; then
        local version=$($1 --version 2>&1 | head -n1)
        echo -e "${GREEN}✓${NC} Command available: $1 ($version)"
        ((CHECKS_PASSED++))
        return 0
    else
        echo -e "${RED}✗${NC} Command not found: $1"
        ((CHECKS_FAILED++))
        return 1
    fi
}

check_port() {
    if ! netstat -tuln 2>/dev/null | grep -q ":$1 "; then
        echo -e "${GREEN}✓${NC} Port $1 is available"
        ((CHECKS_PASSED++))
        return 0
    else
        echo -e "${YELLOW}⚠${NC} Port $1 is already in use"
        ((CHECKS_WARNINGS++))
        return 1
    fi
}

check_env_var() {
    if grep -q "^$1=" .env; then
        local value=$(grep "^$1=" .env | cut -d'=' -f2)
        if [ -z "$value" ]; then
            echo -e "${YELLOW}⚠${NC} $1 is empty in .env"
            ((CHECKS_WARNINGS++))
            return 1
        else
            echo -e "${GREEN}✓${NC} $1 is configured"
            ((CHECKS_PASSED++))
            return 0
        fi
    else
        echo -e "${RED}✗${NC} $1 not found in .env"
        ((CHECKS_FAILED++))
        return 1
    fi
}

# =========================================
# Check: System Commands
# =========================================
echo ""
echo -e "${BLUE}[1/7] Checking system commands...${NC}"
check_command docker
check_command docker-compose
check_command curl
check_command git

# =========================================
# Check: Directory Structure
# =========================================
echo ""
echo -e "${BLUE}[2/7] Checking directory structure...${NC}"
check_dir Backend
check_dir Frontend
check_dir despliegue
check_dir despliegue/docker
check_dir despliegue/caddy
check_dir despliegue/nginx
check_dir despliegue/database
check_dir despliegue/scripts
check_dir despliegue/config
check_dir ecotrack-data

# =========================================
# Check: Configuration Files
# =========================================
echo ""
echo -e "${BLUE}[3/7] Checking configuration files...${NC}"
check_file despliegue/docker-compose.yml
check_file despliegue/docker/Dockerfile.backend
check_file despliegue/docker/Dockerfile.frontend
check_file despliegue/docker/Dockerfile.mysql
check_file despliegue/caddy/Caddyfile
check_file despliegue/nginx/nginx.conf
check_file despliegue/nginx/conf.d/default.conf
check_file despliegue/database/initial.sql
check_file despliegue/database/data.sql
check_file despliegue/config/application-prod.properties

# =========================================
# Check: Project Structure
# =========================================
echo ""
echo -e "${BLUE}[4/7] Checking project structure...${NC}"
check_file Backend/ecotrack-backend/ecotrack-backend/pom.xml
check_file Frontend/ecotrack/package.json
check_file Frontend/ecotrack/angular.json
check_file Frontend/ecotrack/src/environments/environment.ts
check_file Frontend/ecotrack/src/environments/environment.prod.ts
check_file Frontend/ecotrack/src/app/services/environment.service.ts

# =========================================
# Check: Environment Configuration
# =========================================
echo ""
echo -e "${BLUE}[5/7] Checking environment configuration...${NC}"

if [ -f "despliegue/.env" ]; then
    echo -e "${GREEN}✓${NC} .env file exists"
    ((CHECKS_PASSED++))
    
    # Check critical variables
    check_env_var DOMAIN
    check_env_var MYSQL_ROOT_PASSWORD
    check_env_var MYSQL_DATABASE
    check_env_var MYSQL_USER
    check_env_var MYSQL_PASSWORD
    check_env_var MAIL_USERNAME
    check_env_var MAIL_PASSWORD
    check_env_var CORS_ALLOWED_ORIGINS
else
    echo -e "${RED}✗${NC} .env file not found"
    echo -e "${YELLOW}   Run: cp despliegue/config/.env.example despliegue/.env${NC}"
    ((CHECKS_FAILED++))
fi

# =========================================
# Check: Ports Availability
# =========================================
echo ""
echo -e "${BLUE}[6/7] Checking port availability...${NC}"
check_port 80
check_port 443
check_port 3306
check_port 8080

# =========================================
# Check: Docker & Images
# =========================================
echo ""
echo -e "${BLUE}[7/7] Checking Docker resources...${NC}"

if docker info &> /dev/null; then
    echo -e "${GREEN}✓${NC} Docker daemon is running"
    ((CHECKS_PASSED++))
else
    echo -e "${RED}✗${NC} Docker daemon is not running"
    ((CHECKS_FAILED++))
fi

if docker-compose -f despliegue/docker-compose.yml config > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} docker-compose.yml is valid"
    ((CHECKS_PASSED++))
else
    echo -e "${RED}✗${NC} docker-compose.yml has syntax errors"
    ((CHECKS_FAILED++))
fi

# Check if we can pull images (requires internet)
if curl -s https://registry.hub.docker.com/v2/ > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Docker Hub is accessible"
    ((CHECKS_PASSED++))
else
    echo -e "${YELLOW}⚠${NC} Cannot reach Docker Hub (you may need internet for first build)"
    ((CHECKS_WARNINGS++))
fi

# =========================================
# Summary
# =========================================
echo ""
echo -e "${BLUE}=========================================="
echo "VERIFICATION SUMMARY"
echo "==========================================${NC}"
echo ""
echo -e "${GREEN}✓ Passed: $CHECKS_PASSED${NC}"
echo -e "${YELLOW}⚠ Warnings: $CHECKS_WARNINGS${NC}"
echo -e "${RED}✗ Failed: $CHECKS_FAILED${NC}"
echo ""

if [ $CHECKS_FAILED -eq 0 ]; then
    if [ $CHECKS_WARNINGS -eq 0 ]; then
        echo -e "${GREEN}All checks passed! Ready for deployment.${NC}"
        echo ""
        echo "Next steps:"
        echo "  1. Verify .env values are correct"
        echo "  2. Run: cd despliegue && docker-compose build"
        echo "  3. Run: docker-compose up -d"
        exit 0
    else
        echo -e "${YELLOW}All critical checks passed, but there are warnings.${NC}"
        echo ""
        echo "Review warnings above and address if needed."
        echo "You can proceed with caution."
        exit 0
    fi
else
    echo -e "${RED}Some checks failed. Please fix the issues above before deploying.${NC}"
    exit 1
fi
