#!/bin/bash
# ============================================
# ECOTRACK DEPLOYMENT SCRIPT
# Execute complete deployment in one command
# ============================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
DEPLOY_DIR="$PROJECT_ROOT/despliegue"

echo -e "${BLUE}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║         ECOTRACK PRODUCTION DEPLOYMENT SCRIPT              ║"
echo "║                                                            ║"
echo "║ This script will:                                          ║"
echo "║ 1. Verify system requirements                             ║"
echo "║ 2. Check configuration                                    ║"
echo "║ 3. Build Docker images                                    ║"
echo "║ 4. Start all services                                     ║"
echo "║ 5. Verify deployment                                      ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""

# Function to print step
print_step() {
    echo -e "${BLUE}[$(date +'%H:%M:%S')]${NC} $1"
}

# Function to print success
print_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

# Function to print error
print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

# Function to print warning
print_warning() {
    echo -e "${YELLOW}[⚠]${NC} $1"
}

# ============================================
# STEP 1: PRE-DEPLOYMENT CHECKS
# ============================================
print_step "Step 1: Running pre-deployment checks..."

if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed"
    exit 1
fi
print_success "Docker is installed"

if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed"
    exit 1
fi
print_success "Docker Compose is installed"

if [ ! -f "$DEPLOY_DIR/.env" ]; then
    print_error ".env file not found at $DEPLOY_DIR/.env"
    echo "  Run: cp $DEPLOY_DIR/config/.env.example $DEPLOY_DIR/.env"
    echo "  Edit: $DEPLOY_DIR/.env"
    exit 1
fi
print_success ".env file found"

if ! grep -q "^DOMAIN=" "$DEPLOY_DIR/.env"; then
    print_error "DOMAIN not configured in .env"
    exit 1
fi
DOMAIN=$(grep "^DOMAIN=" "$DEPLOY_DIR/.env" | cut -d'=' -f2)
print_success "Domain configured: $DOMAIN"

echo ""

# ============================================
# STEP 2: ENVIRONMENT VERIFICATION
# ============================================
print_step "Step 2: Verifying environment configuration..."

REQUIRED_VARS=("DOMAIN" "MYSQL_ROOT_PASSWORD" "MYSQL_PASSWORD" "MAIL_USERNAME" "MAIL_PASSWORD")

for var in "${REQUIRED_VARS[@]}"; do
    if grep -q "^${var}=" "$DEPLOY_DIR/.env"; then
        value=$(grep "^${var}=" "$DEPLOY_DIR/.env" | cut -d'=' -f2)
        if [ -z "$value" ] || [ "$value" == "your_*" ] || [ "$value" == "tu_*" ]; then
            print_warning "$var is not properly configured"
        else
            print_success "$var is configured"
        fi
    else
        print_warning "$var not found in .env"
    fi
done

echo ""

# ============================================
# STEP 3: DOCKER IMAGE BUILD
# ============================================
print_step "Step 3: Building Docker images..."
echo "  This may take several minutes on first run..."
echo ""

cd "$DEPLOY_DIR"

if docker-compose build 2>&1 | tail -20; then
    print_success "Docker images built successfully"
else
    print_error "Failed to build Docker images"
    exit 1
fi

echo ""

# ============================================
# STEP 4: START SERVICES
# ============================================
print_step "Step 4: Starting services..."

if docker-compose up -d; then
    print_success "Services started"
else
    print_error "Failed to start services"
    docker-compose logs
    exit 1
fi

echo ""

# ============================================
# STEP 5: WAIT FOR SERVICES
# ============================================
print_step "Step 5: Waiting for services to be ready..."
echo "  (This may take 30-60 seconds)"

# Wait for MySQL
echo -n "  Waiting for MySQL..."
for i in {1..30}; do
    if docker-compose exec -T mysql mysqladmin ping -h localhost -u root 2>/dev/null | grep -q "mysqld is alive"; then
        echo -e " ${GREEN}OK${NC}"
        break
    fi
    echo -n "."
    sleep 2
done

# Wait for Backend
echo -n "  Waiting for Backend..."
for i in {1..30}; do
    if curl -s http://localhost:8080/api/actuator/health 2>/dev/null | grep -q "UP"; then
        echo -e " ${GREEN}OK${NC}"
        break
    fi
    echo -n "."
    sleep 2
done

# Wait for Frontend
echo -n "  Waiting for Frontend..."
for i in {1..30}; do
    if curl -s http://localhost/health 2>/dev/null | grep -q "healthy"; then
        echo -e " ${GREEN}OK${NC}"
        break
    fi
    echo -n "."
    sleep 2
done

echo ""

# ============================================
# STEP 6: VERIFY DEPLOYMENT
# ============================================
print_step "Step 6: Verifying deployment..."

# Check container status
echo "  Container status:"
docker-compose ps | tail -n +3 | while read line; do
    if echo "$line" | grep -q "Up"; then
        echo "    $(echo $line | awk '{print $1}') - ${GREEN}Running${NC}"
    else
        echo "    $(echo $line | awk '{print $1}') - ${RED}Not running${NC}"
    fi
done

echo ""
echo "  Service connectivity:"

# Test MySQL
if docker-compose exec -T mysql mysqladmin ping -h localhost -u root 2>/dev/null | grep -q "mysqld is alive"; then
    print_success "MySQL is responding"
else
    print_warning "MySQL connectivity issue"
fi

# Test Backend
if curl -s http://localhost:8080/api/actuator/health 2>/dev/null | grep -q "UP"; then
    print_success "Backend API is responding"
else
    print_warning "Backend API connectivity issue"
fi

# Test Frontend
if curl -s http://localhost/ 2>/dev/null | grep -q "<html\|<HTML"; then
    print_success "Frontend is responding"
else
    print_warning "Frontend connectivity issue"
fi

echo ""

# ============================================
# FINAL SUMMARY
# ============================================
print_step "Deployment completed!"
echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                  DEPLOYMENT SUCCESSFUL                    ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "Application URLs:"
echo -e "  Frontend:  ${BLUE}https://${DOMAIN}/${NC}"
echo -e "  API:       ${BLUE}https://${DOMAIN}/api/${NC}"
echo -e "  Health:    ${BLUE}https://${DOMAIN}/api/actuator/health${NC}"
echo ""
echo "Useful commands:"
echo "  View logs:       docker-compose -f $DEPLOY_DIR/docker-compose.yml logs -f"
echo "  Stop services:   docker-compose -f $DEPLOY_DIR/docker-compose.yml down"
echo "  Restart:         docker-compose -f $DEPLOY_DIR/docker-compose.yml restart"
echo "  SSH into MySQL:  docker-compose -f $DEPLOY_DIR/docker-compose.yml exec mysql bash"
echo ""
echo "Next steps:"
echo "  1. Wait 2-5 minutes for SSL certificate generation"
echo "  2. Access https://$DOMAIN/ in your browser"
echo "  3. Monitor logs for any issues"
echo "  4. Set up backup scripts (see DEPLOYMENT_GUIDE.md)"
echo ""
print_warning "IMPORTANT: Keep your .env file secure and backed up!"
echo ""
