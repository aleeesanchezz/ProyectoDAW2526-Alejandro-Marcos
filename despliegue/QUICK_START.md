# 🚀 QUICK START - ECOTRACK DESPLIEGUE

## Requisitos Previos
- Docker & Docker Compose instalados
- Puertos 80, 443 abiertos
- Dominio DuckDNS configurado
- Email Gmail con app password

---

## Despliegue en 5 Minutos

### 1️⃣ Preparar Configuración
```bash
cd despliegue
cp config/.env.example .env
nano .env
```

**Editar en .env:**
```
DOMAIN=tu-dominio.duckdns.org
MYSQL_ROOT_PASSWORD=contraseña_segura_1
MYSQL_PASSWORD=contraseña_segura_2
MAIL_USERNAME=tu_email@gmail.com
MAIL_PASSWORD=tu_app_password_gmail
CORS_ALLOWED_ORIGINS=https://tu-dominio.duckdns.org
```

### 2️⃣ Construir Imágenes
```bash
docker-compose build
```
*(Toma 3-5 minutos en primera ejecución)*

### 3️⃣ Iniciar Servicios
```bash
docker-compose up -d
```

### 4️⃣ Esperar a que esté listo
```bash
docker-compose logs -f

# Esperar a ver:
# - "MySQL Server is ready"
# - "Started EcotrackBackendApplication"
# - "Caddy started"
```

### 5️⃣ Acceder a la Aplicación
```
https://tu-dominio.duckdns.org/
```

---

## Verificación Rápida

### ✅ Todos los servicios en línea
```bash
docker-compose ps
# Deberías ver 4 contenedores con estado "Up"
```

### ✅ Base de datos funcionando
```bash
curl http://localhost/api/actuator/health
# Deberías ver: "status":"UP"
```

### ✅ Frontend cargando
```bash
curl -I http://localhost/
# Deberías ver: 200 OK
```

---

## Comandos Útiles

### 📋 Ver Logs
```bash
# Todos los servicios
docker-compose logs -f

# Servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
docker-compose logs -f caddy
```

### 🔄 Reiniciar
```bash
docker-compose restart

# O servicio específico
docker-compose restart backend
```

### 🛑 Detener
```bash
docker-compose down
```

### 🗑️ Limpiar TODO (CUIDADO - Borra datos)
```bash
docker-compose down -v
```

---

## Troubleshooting Rápido

### ❌ No puedo acceder a https://
**Solución:** Caddy genera certificado automáticamente (2-5 min). Esperar y reintentar.

### ❌ API devuelve error 502
**Solución:**
```bash
docker-compose logs backend
docker-compose restart backend
```

### ❌ Base de datos no conecta
**Solución:**
```bash
docker-compose logs mysql
docker-compose restart mysql
```

### ❌ Frontend muestra página en blanco
**Solución:**
```bash
docker-compose logs frontend
docker-compose rebuild frontend
docker-compose up -d frontend
```

---

## Configuración Post-Despliegue

### 🔐 Cambiar Contraseñas

1. Actualizar `.env`:
   ```bash
   MYSQL_ROOT_PASSWORD=nueva_contraseña_1
   MYSQL_PASSWORD=nueva_contraseña_2
   ```

2. Reiniciar MySQL:
   ```bash
   docker-compose restart mysql
   ```

3. Cambiar en BD:
   ```bash
   docker-compose exec mysql mysql -u root -p
   > ALTER USER 'ecotrack_user'@'%' IDENTIFIED BY 'nueva_contraseña_2';
   > FLUSH PRIVILEGES;
   ```

### 📧 Verificar Email

Probar creando un usuario y pidiendo recuperación de contraseña:
```bash
# Revisar logs del backend
docker-compose logs backend | grep -i mail
```

### 📊 Monitorear Performance

```bash
# Ver uso de recursos
docker stats

# Ver logs con errors
docker-compose logs | grep -i error
```

---

## Backup de Datos

### 💾 Backup Manual

```bash
# Exportar base de datos
docker-compose exec mysql mysqldump \
  -u ecotrack_user -p \
  ecotrack > backup_$(date +%Y%m%d_%H%M%S).sql

# Restaurar
cat backup.sql | docker-compose exec -T mysql \
  mysql -u ecotrack_user -p ecotrack
```

### 🔄 Backup Automático (cron)

```bash
# Crear script
cat > /home/usuario/backup-ecotrack.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/usuario/backups"
mkdir -p $BACKUP_DIR
docker-compose -f /ruta/despliegue/docker-compose.yml exec -T mysql \
  mysqldump -u root -p$MYSQL_ROOT_PASSWORD ecotrack \
  > $BACKUP_DIR/backup_$DATE.sql
# Mantener solo últimos 7 días
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete
EOF

chmod +x /home/usuario/backup-ecotrack.sh

# Agregar a cron (2 AM diariamente)
crontab -e
# Agregar: 0 2 * * * /home/usuario/backup-ecotrack.sh
```

---

## Actualizar Código

Si hay cambios en el código:

```bash
# 1. Pull cambios
git pull

# 2. Reconstruir imágenes
docker-compose build

# 3. Reiniciar servicios
docker-compose up -d

# 4. Ver logs
docker-compose logs -f
```

---

## Seguridad Checklist

- [ ] Cambiar TODAS las contraseñas en `.env`
- [ ] No commitear `.env` al repositorio
- [ ] Firewall habilitado y configurado
- [ ] Backups automáticos configurados
- [ ] HTTPS funcionando (certificado válido)
- [ ] Email SMTP funcionando
- [ ] Logs siendo monitoreados

---

## Documentación Completa

Para más detalles:
- **Instalación detallada:** `DEPLOYMENT_GUIDE.md`
- **Cambios realizados:** `CAMBIOS_REALIZADOS.md`
- **README del proyecto:** `../README_DESPLIEGUE.md`

---

## Contacto y Soporte

En caso de problemas:
1. Revisar logs: `docker-compose logs -f`
2. Consultar `DEPLOYMENT_GUIDE.md` (sección Troubleshooting)
3. Revisar Estado de servicios: `docker ps`

---

**Última actualización:** 25 de enero de 2026
**Versión:** 1.0 - Production Ready
