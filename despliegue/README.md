# Despliegue de EcoTrack

Este directorio contiene la configuración necesaria para desplegar EcoTrack en producción usando Docker Compose, con Caddy como proxy inverso.

## Estructura del Despliegue

```
despliegue/
├── docker-compose.yml          # Orquestación de servicios
├── .env.example               # Variables de entorno de ejemplo
├── caddy/
│   └── Caddyfile              # Configuración de Caddy (proxy inverso)
├── config/
│   └── application-prod.properties  # Configuración de Spring Boot (producción)
├── database/
│   ├── initial.sql            # Script de inicialización de BD
│   └── data.sql               # Datos iniciales
├── docker/
│   ├── Dockerfile.backend     # Dockerfile para Spring Boot
│   ├── Dockerfile.frontend    # Dockerfile para Angular
│   └── Dockerfile.mysql       # Dockerfile para MySQL
└── nginx/
    ├── nginx.conf             # Configuración principal de Nginx
    └── conf.d/
        └── default.conf       # Configuración del servidor Nginx
```

## Servicios

El despliegue incluye los siguientes servicios:

- **mysql**: Base de datos MySQL 8
- **backend**: API Spring Boot (puerto interno 8080)
- **frontend**: Aplicación Angular servida por Nginx (puerto interno 80)
- **caddy**: Proxy inverso con HTTPS automático (puertos 80 y 443)

## Prerequisitos

- Docker (versión 20.10 o superior)
- Docker Compose (versión 2.0 o superior)

## Instrucciones de Despliegue

### 1. Configurar Variables de Entorno

Copiar el archivo de ejemplo y configurar las variables necesarias:

```bash
cd despliegue
cp .env.example .env
```

Editar el archivo `.env` con tus valores:
- Credenciales de base de datos
- Configuración de correo
- Dominio y CORS
- Otros parámetros

### 2. Construir e Iniciar los Servicios

Desde el directorio raíz del proyecto (no desde despliegue/):

```bash
# Construir las imágenes
docker-compose -f despliegue/docker-compose.yml build

# Iniciar todos los servicios
docker-compose -f despliegue/docker-compose.yml up -d
```

### 3. Verificar el Estado

```bash
# Ver logs de todos los servicios
docker-compose -f despliegue/docker-compose.yml logs -f

# Ver logs de un servicio específico
docker-compose -f despliegue/docker-compose.yml logs -f backend

# Verificar el estado de los servicios
docker-compose -f despliegue/docker-compose.yml ps
```

### 4. Acceder a la Aplicación

- **Aplicación**: https://tu-dominio.com
- **API**: https://tu-dominio.com/api

## Comandos Útiles

```bash
# Detener todos los servicios
docker-compose -f despliegue/docker-compose.yml down

# Detener y eliminar volúmenes (CUIDADO: elimina los datos)
docker-compose -f despliegue/docker-compose.yml down -v

# Reconstruir un servicio específico
docker-compose -f despliegue/docker-compose.yml build backend
docker-compose -f despliegue/docker-compose.yml up -d backend

# Ver logs en tiempo real
docker-compose -f despliegue/docker-compose.yml logs -f

# Ejecutar comandos en un contenedor
docker exec -it ecotrack-backend bash
docker exec -it ecotrack-mysql mysql -u root -p
```

## Verificación del Despliegue

### Health Checks

Todos los servicios incluyen health checks:

```bash
# Backend
curl http://localhost:8080/api/actuator/health

# Frontend (interno)
docker exec ecotrack-frontend wget --quiet --tries=1 --spider http://localhost:80/
```

### Verificación de Base de Datos

```bash
docker exec -it ecotrack-mysql mysql -u ecotrack_user -p ecotrack
```

## Solución de Problemas

### El backend no se conecta a la base de datos

1. Verificar que el servicio MySQL esté saludable:
   ```bash
   docker-compose -f despliegue/docker-compose.yml ps
   ```

2. Revisar logs de MySQL:
   ```bash
   docker-compose -f despliegue/docker-compose.yml logs mysql
   ```

3. Verificar las credenciales en el archivo `.env`

### Error de CORS

- Verificar que `CORS_ALLOWED_ORIGINS` en `.env` coincida con tu dominio
- Asegurarse de que el backend esté usando el perfil `prod`

### El frontend no carga

1. Verificar que la compilación de producción fue exitosa:
   ```bash
   docker-compose -f despliegue/docker-compose.yml logs frontend
   ```

2. Verificar la configuración de Nginx:
   ```bash
   docker exec ecotrack-frontend cat /etc/nginx/conf.d/default.conf
   ```

### Caddy no genera certificados SSL

- Asegurarse de que los puertos 80 y 443 estén abiertos
- Verificar que el dominio apunte a la IP del servidor
- Revisar logs de Caddy:
  ```bash
  docker-compose -f despliegue/docker-compose.yml logs caddy
  ```

## Mantenimiento

### Backup de la Base de Datos

```bash
docker exec ecotrack-mysql mysqldump -u root -p ecotrack > backup_$(date +%Y%m%d).sql
```

### Restaurar Base de Datos

```bash
docker exec -i ecotrack-mysql mysql -u root -p ecotrack < backup.sql
```

### Actualizar la Aplicación

```bash
# 1. Detener servicios
docker-compose -f despliegue/docker-compose.yml down

# 2. Hacer pull de los cambios
git pull

# 3. Reconstruir las imágenes
docker-compose -f despliegue/docker-compose.yml build

# 4. Iniciar servicios
docker-compose -f despliegue/docker-compose.yml up -d
```

## Seguridad

- Cambiar todas las contraseñas por defecto en el archivo `.env`
- No versionar el archivo `.env` (ya está en .gitignore)
- Mantener Docker y las imágenes actualizadas
- Revisar regularmente los logs en busca de actividad sospechosa

## Notas Importantes

- El backend usa el perfil `prod` que carga `application-prod.properties`
- Las variables de entorno del `docker-compose.yml` sobrescriben las del `application-prod.properties`
- El frontend en producción usa rutas relativas (`/api`) que son resueltas por Caddy
- Caddy maneja automáticamente los certificados SSL con Let's Encrypt
