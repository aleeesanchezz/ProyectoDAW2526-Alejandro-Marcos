# EcoTrack - Guía Rápida de Despliegue

## 🚀 Inicio Rápido

### Prerequisitos
- Docker instalado y corriendo
- Tener los puertos 80, 443, 3306 y 8080 disponibles

### Pasos para Desplegar

#### 1. Configurar Variables de Entorno
```bash
# Copiar el archivo de ejemplo
cp despliegue/.env.example despliegue/.env

# Editar el archivo .env con tus valores (especialmente contraseñas)
nano despliegue/.env
```

#### 2. Desplegar con el Script Automatizado
```bash
# Desde la raíz del proyecto
chmod +x despliegue/scripts/deploy.sh
./despliegue/scripts/deploy.sh
```

Este script automáticamente:
- ✅ Verifica Docker y Docker Compose
- ✅ Crea el archivo .env si no existe
- ✅ Construye las imágenes Docker
- ✅ Inicia todos los servicios
- ✅ Verifica que el backend esté listo

#### 3. Verificar el Estado
```bash
chmod +x despliegue/scripts/verificar-estado.sh
./despliegue/scripts/verificar-estado.sh
```

## 📋 Comandos Útiles

### Ver Logs
```bash
# Todos los servicios
docker-compose -f despliegue/docker-compose.yml logs -f

# Solo backend
docker-compose -f despliegue/docker-compose.yml logs -f backend

# Solo frontend
docker-compose -f despliegue/docker-compose.yml logs -f frontend
```

### Detener Servicios
```bash
# Detener conservando datos
./despliegue/scripts/stop.sh

# Detener eliminando TODO (incluida base de datos)
./despliegue/scripts/stop.sh --remove-volumes
```

### Reiniciar un Servicio Específico
```bash
# Reiniciar backend
docker-compose -f despliegue/docker-compose.yml restart backend

# Reconstruir y reiniciar backend
docker-compose -f despliegue/docker-compose.yml build backend
docker-compose -f despliegue/docker-compose.yml up -d backend
```

## 🌐 Acceso a la Aplicación

### Desarrollo Local (sin Docker)
- Frontend: http://localhost:4200
- Backend: http://localhost:8080/api
- Health Check: http://localhost:8080/api/actuator/health

### Producción (con Docker)
- Frontend: http://localhost o https://tu-dominio.com
- Backend: http://localhost/api o https://tu-dominio.com/api
- Health Check: http://localhost:8080/api/actuator/health (directo al contenedor)

## 🔧 Solución Rápida de Problemas

### El backend no arranca
```bash
# Ver logs del backend
docker-compose -f despliegue/docker-compose.yml logs backend

# Verificar que MySQL esté listo
docker-compose -f despliegue/docker-compose.yml logs mysql
```

### El frontend no carga
```bash
# Ver logs del frontend
docker-compose -f despliegue/docker-compose.yml logs frontend

# Verificar configuración de nginx
docker exec ecotrack-frontend cat /etc/nginx/conf.d/default.conf
```

### Error de CORS
1. Verifica que `CORS_ALLOWED_ORIGINS` en `.env` sea correcto
2. Reinicia el backend:
```bash
docker-compose -f despliegue/docker-compose.yml restart backend
```

### Resetear todo y empezar de cero
```bash
# CUIDADO: Esto elimina TODOS los datos
./despliegue/scripts/stop.sh --remove-volumes
./despliegue/scripts/deploy.sh
```

## 📊 Verificación de Salud

### Verificar Todos los Servicios
```bash
docker-compose -f despliegue/docker-compose.yml ps
```

Deberías ver todos los servicios con estado "Up (healthy)"

### Health Check Manual

**Backend:**
```bash
curl http://localhost:8080/api/actuator/health
```

**Frontend:**
```bash
curl http://localhost
```

**MySQL:**
```bash
docker exec ecotrack-mysql mysqladmin ping -h localhost
```

## 🔄 Actualizar la Aplicación

```bash
# 1. Detener servicios
./despliegue/scripts/stop.sh

# 2. Actualizar código (git pull o tus cambios)

# 3. Reconstruir y desplegar
./despliegue/scripts/deploy.sh
```

## 💾 Backup de Datos

### Hacer Backup de MySQL
```bash
docker exec ecotrack-mysql mysqldump -u root -p<password> ecotrack > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Restaurar Backup
```bash
cat backup_20260128_120000.sql | docker exec -i ecotrack-mysql mysql -u root -p<password> ecotrack
```

## 📝 Variables de Entorno Importantes

Edita `despliegue\.env`:

```env
# Base de datos
MYSQL_ROOT_PASSWORD=tu_password_seguro
MYSQL_DATABASE=ecotrack
MYSQL_USER=ecotrack_user
MYSQL_PASSWORD=tu_password_usuario

# Email (para recuperación de contraseñas)
MAIL_USERNAME=tu_email@gmail.com
MAIL_PASSWORD=tu_app_password

# CORS y dominio
CORS_ALLOWED_ORIGINS=https://tu-dominio.com
DOMAIN=tu-dominio.com
```

## 🎯 Checklist de Despliegue

- [ ] Docker Desktop instalado y corriendo
- [ ] Archivo `.env` creado y configurado
- [ ] Puertos 80, 443, 3306, 8080 disponibles
- [ ] Script de deploy ejecutado sin errores
- [ ] Todos los contenedores en estado "healthy"
- [ ] Backend responde en health check
- [ ] Frontend carga en el navegador
- [ ] Login funciona correctamente

## 📞 Soporte

Si algo no funciona:
1. Revisa los logs: `docker-compose -f despliegue/docker-compose.yml logs`
2. Verifica el estado: `./despliegue/scripts/verificar-estado.sh`
3. Consulta el README completo en `despliegue/README.md`
4. Revisa los cambios realizados en `CAMBIOS_DESPLIEGUE.md`
