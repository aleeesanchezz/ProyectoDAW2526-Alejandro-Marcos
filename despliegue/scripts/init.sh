#!/bin/bash
# ============================================
# Ecotrack Application Deployment Script
# Production Environment Setup
# ============================================

set -e

echo "=========================================="
echo "ECOTRACK DEPLOYMENT INITIALIZATION"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker and Docker Compose are installed${NC}"

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}Creating .env file...${NC}"
    cat > .env << EOF
# ============================================
# ECOTRACK PRODUCTION ENVIRONMENT VARIABLES
# ============================================

# Domain Configuration
DOMAIN=ecotrack-pi.duckdns.org
EMAIL=admin@ecotrack.com

# MySQL Database Configuration
MYSQL_HOST=mysql
MYSQL_PORT=3306
MYSQL_ROOT_PASSWORD=root_ecotrack_2024
MYSQL_DATABASE=ecotrack
MYSQL_USER=ecotrack_user
MYSQL_PASSWORD=ecotrack_pass_secure_2024

# Mail Configuration (Gmail SMTP)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=ecotrack_email@gmail.com
MAIL_PASSWORD=your_app_password_here

# CORS Configuration
CORS_ALLOWED_ORIGINS=https://ecotrack-pi.duckdns.org

# Ports
HTTP_PORT=80
HTTPS_PORT=443

# Environment
ENVIRONMENT=production
EOF
    echo -e "${GREEN}✓ .env file created${NC}"
    echo -e "${YELLOW}⚠ Please update the .env file with your actual credentials!${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

# Create necessary directories
echo -e "${YELLOW}Creating required directories...${NC}"
mkdir -p despliegue/docker
mkdir -p despliegue/caddy
mkdir -p despliegue/nginx/conf.d
mkdir -p despliegue/database
mkdir -p despliegue/scripts
mkdir -p despliegue/config
mkdir -p ecotrack-data/mysql_data
mkdir -p ecotrack-data/caddy_data
mkdir -p ecotrack-data/logs

echo -e "${GREEN}✓ Directories created${NC}"

# Set correct permissions
echo -e "${YELLOW}Setting file permissions...${NC}"
chmod +x despliegue/scripts/*.sh
chmod 644 despliegue/caddy/Caddyfile
chmod 644 despliegue/nginx/nginx.conf

echo -e "${GREEN}✓ Permissions configured${NC}"

# Display next steps
echo ""
echo -e "${GREEN}=========================================="
echo "DEPLOYMENT READY!"
echo "==========================================${NC}"
echo ""
echo "Next steps:"
echo "1. Update .env file with your credentials"
echo "2. Ensure ports 80 and 443 are available"
echo "3. Configure DuckDNS with your public IP"
echo "4. Run: docker-compose -f despliegue/docker-compose.yml up -d"
echo ""
echo "To view logs:"
echo "  docker-compose -f despliegue/docker-compose.yml logs -f"
echo ""
echo "To stop all services:"
echo "  docker-compose -f despliegue/docker-compose.yml down"
echo ""
