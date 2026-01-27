# GUÍA DE DESPLIEGUE - ECOTRACK

## Descripción General

Este documento proporciona instrucciones completas para desplegar la aplicación Ecotrack en un entorno de producción usando Docker, Docker Compose, Caddy y DuckDNS.

## Requisitos Previos

### Hardware
- Servidor o VPS con mínimo 2GB RAM
- 10GB de espacio en disco
- Conectividad a internet estable

### Software
- Docker 20.10+
- Docker Compose 1.29+
- curl (para testing)

### Configuración de Red
- Acceso a puertos 80 (HTTP) y 443 (HTTPS)
- Acceso a Puerto 3306 (MySQL, interno)
- Acceso a Puerto 8080 (Backend, interno)

### Servicios Externos
- DuckDNS (DNS dinámico)
- Gmail SMTP (para envío de emails)

## Estructura del Proyecto

```
ProyectoDAW2526-Alejandro-Marcos/
├── Backend/                    # Spring Boot Backend
├── Frontend/                   # Angular Frontend
├── despliegue/                # Configuración de despliegue
│   ├── docker/               # Dockerfiles
│   │   ├── Dockerfile.backend
│   │   ├── Dockerfile.frontend
│   │   └── Dockerfile.mysql
│   ├── caddy/                # Configuración de Caddy (proxy inverso)
│   ├── nginx/                # Configuración de Nginx (frontend)
│   ├── database/             # Scripts SQL
│   ├── scripts/              # Scripts de utilidad
│   ├── config/               # Archivos de configuración
│   └── docker-compose.yml    # Orquestación de contenedores
└── ecotrack-data/            # Volúmenes persistentes
    ├── mysql_data/
    ├── caddy_data/
    └── logs/
```

## Pasos de Instalación

### 1. Preparación del Servidor

#### 1.1 Instalar Docker y Docker Compose

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verificar instalación
docker --version
docker-compose --version
```

#### 1.2 Clonar/Preparar el Repositorio

```bash
cd /home/usuario/
git clone <tu-repo> ProyectoDAW2526-Alejandro-Marcos
cd ProyectoDAW2526-Alejandro-Marcos
```

### 2. Configuración del Entorno

#### 2.1 Crear archivo .env

```bash
cd despliegue
cp config/.env.example .env
nano .env
```

#### 2.2 Variables Importantes a Configurar

```bash
# Dominio (cambiar según tu dominio DuckDNS)
DOMAIN=tu-dominio.duckdns.org

# Contraseñas (CAMBIAR VALORES POR DEFECTO)
MYSQL_ROOT_PASSWORD=tu_contraseña_mysql_segura
MYSQL_PASSWORD=tu_contraseña_usuario_segura

# Email (para recuperación de contraseña)
MAIL_USERNAME=tu_email@gmail.com
MAIL_PASSWORD=tu_app_password_gmail  # Obtener en https://myaccount.google.com/apppasswords

# CORS (mismo dominio que arriba)
CORS_ALLOWED_ORIGINS=https://tu-dominio.duckdns.org
```

### 3. Configuración de DuckDNS

#### 3.1 Crear cuenta en DuckDNS

1. Ir a https://www.duckdns.org
2. Login con cuenta de Google/Github
3. Crear un dominio (ej: ecotrack-pi)
4. Anotar el token
5. Instalar cliente DDNS:

```bash
# Crear directorio
mkdir -p ~/.duckdns

# Crear script
cat > ~/.duckdns/ddns.sh << 'EOF'
#!/bin/bash
DUCKDNS_DOMAIN="tu-dominio"
DUCKDNS_TOKEN="tu-token"
IP=$(curl -s http://ipv4.icanhazip.com)
curl "https://www.duckdns.org/update?domains=$DUCKDNS_DOMAIN&token=$DUCKDNS_TOKEN&ip=$IP"
EOF

# Hacer ejecutable
chmod +x ~/.duckdns/ddns.sh

# Agregar a cron (cada 5 minutos)
crontab -e
# Agregar línea: */5 * * * * ~/.duckdns/ddns.sh
```

### 4. Configuración de Google SMTP

#### 4.1 Habilitar SMTP en Gmail

1. Ir a https://myaccount.google.com/
2. Security → App passwords
3. Seleccionar "Mail" y "Windows/Linux/Mac"
4. Copiar contraseña generada
5. Usar en MAIL_PASSWORD del .env

### 5. Despliegue de la Aplicación

#### 5.1 Construir y Levantar Contenedores

```bash
cd /ruta/a/ProyectoDAW2526-Alejandro-Marcos

# Construir imágenes (primera vez)
docker-compose -f despliegue/docker-compose.yml build

# Iniciar servicios
docker-compose -f despliegue/docker-compose.yml up -d

# Ver estado de los servicios
docker-compose -f despliegue/docker-compose.yml ps

# Ver logs
docker-compose -f despliegue/docker-compose.yml logs -f
```

#### 5.2 Verificar Despliegue

```bash
# Esperar 30-60 segundos para que los servicios inicien

# Verificar que los contenedores están corriendo
docker ps

# Ver estado de la base de datos
docker-compose -f despliegue/docker-compose.yml exec mysql mysqladmin ping

# Ver logs del backend
docker-compose -f despliegue/docker-compose.yml logs backend

# Ver logs del frontend
docker-compose -f despliegue/docker-compose.yml logs frontend

# Ver logs de Caddy
docker-compose -f despliegue/docker-compose.yml logs caddy
```

### 6. Pruebas de Acceso

#### 6.1 Desde el mismo servidor

```bash
# Frontend (HTTP)
curl -I http://localhost/

# API Backend
curl -I http://localhost/api/actuator/health

# HTTPS (primera vez puede dar error de certificado)
curl -k -I https://tu-dominio.duckdns.org/
```

#### 6.2 Desde otra máquina

```bash
# Abrir navegador
https://tu-dominio.duckdns.org/

# Probar API
curl https://tu-dominio.duckdns.org/api/actuator/health
```

## Gestión de la Aplicación

### Detener Servicios

```bash
docker-compose -f despliegue/docker-compose.yml down
```

### Reiniciar Servicios

```bash
docker-compose -f despliegue/docker-compose.yml restart
```

### Actualizar Aplicación

```bash
# Pull de código
git pull

# Reconstruir imágenes
docker-compose -f despliegue/docker-compose.yml build

# Reiniciar con nuevas imágenes
docker-compose -f despliegue/docker-compose.yml up -d
```

### Backup de Base de Datos

```bash
# Crear backup
docker-compose -f despliegue/docker-compose.yml exec mysql \
  mysqldump -u root -p$MYSQL_ROOT_PASSWORD ecotrack \
  > backup_$(date +%Y%m%d_%H%M%S).sql

# Restaurar backup
docker-compose -f despliegue/docker-compose.yml exec -T mysql \
  mysql -u root -p$MYSQL_ROOT_PASSWORD ecotrack < backup.sql
```

### Ver Logs

```bash
# Todos los servicios
docker-compose -f despliegue/docker-compose.yml logs -f

# Un servicio específico
docker-compose -f despliegue/docker-compose.yml logs -f backend
docker-compose -f despliegue/docker-compose.yml logs -f frontend
docker-compose -f despliegue/docker-compose.yml logs -f mysql
docker-compose -f despliegue/docker-compose.yml logs -f caddy
```

## Troubleshooting

### Problema: Certificado SSL no válido

**Solución:**
```bash
# Esperar a que Caddy genere certificado (2-5 minutos)
docker-compose -f despliegue/docker-compose.yml logs caddy | grep -i certificate

# Si persiste, revisar errores de ACME:
docker-compose -f despliegue/docker-compose.yml logs caddy
```

### Problema: Base de datos no se conecta

**Solución:**
```bash
# Verificar que el contenedor MySQL está corriendo
docker ps | grep mysql

# Ver logs de MySQL
docker-compose -f despliegue/docker-compose.yml logs mysql

# Reiniciar MySQL
docker-compose -f despliegue/docker-compose.yml restart mysql
```

### Problema: API no responde

**Solución:**
```bash
# Ver logs del backend
docker-compose -f despliegue/docker-compose.yml logs backend

# Verificar que la BD está accesible desde backend
docker-compose -f despliegue/docker-compose.yml exec backend \
  curl http://mysql:3306

# Verificar variables de entorno
docker-compose -f despliegue/docker-compose.yml exec backend env | grep SPRING
```

### Problema: Frontend muestra página en blanco

**Solución:**
```bash
# Ver logs del frontend
docker-compose -f despliegue/docker-compose.yml logs frontend

# Ver logs de Nginx
docker-compose -f despliegue/docker-compose.yml exec frontend nginx -t

# Reconstruir frontend
docker-compose -f despliegue/docker-compose.yml build --no-cache frontend
docker-compose -f despliegue/docker-compose.yml up -d frontend
```

## Monitoreo

### Health Check Manual

```bash
#!/bin/bash
# Script para verificar estado de todos los servicios

echo "=== ESTADO DE CONTENEDORES ==="
docker ps

echo ""
echo "=== MYSQL HEALTH ==="
docker-compose -f despliegue/docker-compose.yml exec mysql mysqladmin ping -u root || echo "FALLO"

echo ""
echo "=== BACKEND HEALTH ==="
curl -s http://localhost:8080/api/actuator/health || echo "FALLO"

echo ""
echo "=== FRONTEND HEALTH ==="
curl -s http://localhost/health || echo "FALLO"

echo ""
echo "=== CADDY STATUS ==="
curl -s https://tu-dominio.duckdns.org -k || echo "FALLO"
```

## Configuración Avanzada

### Aumentar Límites de Recursos

En `despliegue/docker-compose.yml`:

```yaml
backend:
  deploy:
    resources:
      limits:
        cpus: '1'
        memory: 1G
      reservations:
        cpus: '0.5'
        memory: 512M
```

### Habilitar HTTPS Forzado

Ya está configurado en `despliegue/caddy/Caddyfile`

### Configurar Rate Limiting

Añadir a Caddyfile:

```
rate_limit {
    zone /api {
        key {remote_host}
        rate 100r/s
        burst 200
    }
}
```

## Seguridad

### Cambiar Contraseñas por Defecto

1. Actualizar `.env` con nuevas contraseñas
2. Actualizar contraseña de MySQL en BD:
   ```bash
   docker-compose exec mysql mysql -u root -p
   ALTER USER 'ecotrack_user'@'%' IDENTIFIED BY 'nueva_password';
   ```

### Habilitar Firewall

```bash
# UFW (Ubuntu)
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### Backups Automáticos

Crear script cron:

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/ruta/a/backups"
mkdir -p $BACKUP_DIR

docker-compose -f /ruta/a/despliegue/docker-compose.yml exec -T mysql \
  mysqldump -u root -p$MYSQL_ROOT_PASSWORD ecotrack \
  > $BACKUP_DIR/backup_$DATE.sql

# Mantener solo últimos 7 backups
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete
```

Agregar a cron:
```bash
0 2 * * * /ruta/a/scripts/backup.sh
```

## Soporte y Recursos

- Documentación de Docker: https://docs.docker.com/
- Documentación de Caddy: https://caddyserver.com/docs/
- Documentación de Spring Boot: https://spring.io/projects/spring-boot
- Documentación de Angular: https://angular.io/

## Checklist Final

- [ ] .env configurado con valores de producción
- [ ] DuckDNS configurado y apuntando al servidor
- [ ] Email de Gmail configurado para SMTP
- [ ] Puertos 80 y 443 accesibles desde internet
- [ ] Firewall configurado correctamente
- [ ] Certificados SSL generados (Caddy lo hace automáticamente)
- [ ] Base de datos inicializada correctamente
- [ ] Frontend accesible en https://tu-dominio.duckdns.org
- [ ] API accesible en https://tu-dominio.duckdns.org/api
- [ ] Backup automatizado configurado
- [ ] Logs siendo monitoreados

---
Última actualización: 25 de enero de 2026
