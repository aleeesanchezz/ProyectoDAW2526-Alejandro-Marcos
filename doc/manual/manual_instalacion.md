# Manual de Instalación — EcoTrack

**Autores:** Alejandro Sánchez Olivera, Marcos Blasco Serrano  
**Curso:** 2º Desarrollo de Aplicaciones Web  
**Fecha:** Enero 2026  
**Versión:** 1.0

---

## Índice
1. [Introducción](#1-introducción)
2. [Requisitos Previos](#2-requisitos-previos)
3. [Instalación con Docker (Recomendado)](#3-instalación-con-docker-recomendado)
4. [Instalación Manual](#4-instalación-manual)
5. [Configuración Inicial](#5-configuración-inicial)
6. [Verificación de la Instalación](#6-verificación-de-la-instalación)
7. [Solución de Problemas](#7-solución-de-problemas)

---

## 1. Introducción

Este manual describe los pasos para instalar y configurar la aplicación **EcoTrack** en tu entorno. EcoTrack es una aplicación web para el seguimiento y análisis de consumo energético y emisiones de CO₂.

### Arquitectura de la Aplicación

- **Frontend:** Angular 16
- **Backend:** Spring Boot 3.3.5 (Java 21)
- **Base de Datos:** MySQL 8
- **Proxy/SSL:** Caddy (para despliegue en producción)

---

## 2. Requisitos Previos

### 2.1 Opción A: Instalación con Docker (Recomendada)

- **Sistema Operativo:** Linux, Windows o macOS
- **Docker:** Versión 20.10 o superior
- **Docker Compose:** Versión 1.29 o superior
- **Puertos disponibles:** 80, 443, 3306 (pueden configurarse)
- **Espacio en disco:** Mínimo 5 GB libres
- **RAM:** Mínimo 2 GB

### 2.2 Opción B: Instalación Manual

- **Sistema Operativo:** Windows 10+, Linux o macOS
- **Java Development Kit (JDK):** Versión 21
- **Node.js:** Versión 18 o superior
- **Angular CLI:** Versión 16
- **MySQL:** Versión 8.0 o superior
- **Maven:** Versión 3.6 o superior

---

## 3. Instalación con Docker

### 3.1 Instalar Docker y Docker Compose

#### En Windows:
1. Descargar Docker Desktop desde https://www.docker.com/products/docker-desktop
2. Ejecutar el instalador y seguir las instrucciones
3. Reiniciar el equipo si es necesario
4. Verificar la instalación:
   ```powershell
   docker --version
   docker-compose --version
   ```

#### En Linux (Ubuntu/Debian):
```bash
# Instalar Docker
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

### 3.2 Obtener el Proyecto

```bash
# Opción 1: Clonar desde Git
git clone <url-del-repositorio> ProyectoDAW2526-Alejandro-Marcos
cd ProyectoDAW2526-Alejandro-Marcos

# Opción 2: Descargar y descomprimir el archivo ZIP
```

### 3.3 Configurar Variables de Entorno

```bash
# Ir al directorio de despliegue
cd despliegue

# Copiar el archivo de ejemplo (si existe)
# Si no existe, crear un archivo .env nuevo
```

Crear o editar el archivo `.env` con el siguiente contenido:

```env
# Dominio (para desarrollo local usar localhost)
DOMAIN=localhost

# Configuración de MySQL
MYSQL_ROOT_PASSWORD=root_password_secure
MYSQL_DATABASE=ecotrack
MYSQL_USER=ecotrack_user
MYSQL_PASSWORD=ecotrack_password_secure
MYSQL_PORT=3306

# Configuración de Email (Gmail)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=tu_email@gmail.com
MAIL_PASSWORD=tu_app_password_gmail

# Configuración CORS (Frontend URL)
CORS_ALLOWED_ORIGINS=http://localhost
FRONTEND_URL=http://localhost
```

**Nota sobre Gmail App Password:**
1. Ir a https://myaccount.google.com/
2. Seguridad → Contraseñas de aplicaciones
3. Generar una contraseña para "Correo" y "Otro (dispositivo personalizado)"
4. Copiar la contraseña generada en `MAIL_PASSWORD`

### 3.4 Construir e Iniciar los Contenedores

```bash
# Construir las imágenes (primera vez o después de cambios)
docker-compose build

# Iniciar los servicios
docker-compose up -d

# Ver los logs para comprobar el progreso
docker-compose logs -f
```

**Tiempo estimado:** 3-5 minutos en la primera ejecución.

### 3.5 Esperar a que los Servicios Estén Listos

Los logs deberían mostrar:
- MySQL: `MySQL Server is ready`
- Backend: `Started EcotrackBackendApplication`
- Frontend: `nginx started`
- Caddy: `Caddy started` (si está configurado)

### 3.6 Acceder a la Aplicación

Abrir el navegador y acceder a:
- **Desarrollo local:** http://localhost
- **Con dominio configurado:** https://tu-dominio.duckdns.org

---

## 4. Instalación Manual

### 4.1 Instalar Prerequisitos

#### Instalar Java 21
1. Descargar desde https://www.oracle.com/java/technologies/downloads/#java21
2. Instalar siguiendo las instrucciones del sistema operativo
3. Verificar:
   ```bash
   java -version
   # Debería mostrar: java version "21.x.x"
   ```

#### Instalar Node.js y npm
1. Descargar desde https://nodejs.org/ (versión LTS)
2. Instalar siguiendo el asistente
3. Verificar:
   ```bash
   node --version
   npm --version
   ```

#### Instalar Angular CLI
```bash
npm install -g @angular/cli@16
ng version
```

#### Instalar MySQL
1. Descargar desde https://dev.mysql.com/downloads/mysql/
2. Instalar y configurar con usuario root
3. Anotar la contraseña de root

#### Instalar Maven
1. Descargar desde https://maven.apache.org/download.cgi
2. Configurar la variable de entorno `MAVEN_HOME`
3. Verificar:
   ```bash
   mvn --version
   ```

### 4.2 Configurar la Base de Datos

```sql
-- Conectar a MySQL como root
mysql -u root -p

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS ecotrack;

-- Crear usuario
CREATE USER 'ecotrack_user'@'localhost' IDENTIFIED BY 'ecotrack_password';

-- Otorgar permisos
GRANT ALL PRIVILEGES ON ecotrack.* TO 'ecotrack_user'@'localhost';
FLUSH PRIVILEGES;

-- Salir
EXIT;
```

Ejecutar scripts iniciales:
```bash
# Ir al directorio sql
cd sql

# Ejecutar scripts (opcional, Hibernate crea las tablas)
mysql -u ecotrack_user -p ecotrack < bbdd.sql
mysql -u ecotrack_user -p ecotrack < datos_iniciales.sql
```

### 4.3 Configurar el Backend

```bash
# Ir al directorio del backend
cd Backend/ecotrack-backend/ecotrack-backend

# Editar application.properties
# Ubicación: src/main/resources/application.properties
```

Configurar `application.properties`:
```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/ecotrack?serverTimezone=UTC
spring.datasource.username=ecotrack_user
spring.datasource.password=ecotrack_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Server
server.port=8080

# Mail Configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=tu_email@gmail.com
spring.mail.password=tu_app_password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

# CORS
cors.allowed.origins=http://localhost:4200
frontend.url=http://localhost:4200
```

### 4.4 Compilar y Ejecutar el Backend

```bash
# Compilar con Maven
mvn clean install

# Ejecutar la aplicación
mvn spring-boot:run
```

El backend estará disponible en: http://localhost:8080

### 4.5 Configurar el Frontend

```bash
# Ir al directorio del frontend
cd Frontend/ecotrack

# Instalar dependencias
npm install

# Si hay errores con versiones, usar:
npm install --legacy-peer-deps
```

Configurar la URL del backend en `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

### 4.6 Ejecutar el Frontend

```bash
# Modo desarrollo
ng serve

# O especificar puerto
ng serve --port 4200
```

El frontend estará disponible en: http://localhost:4200

---

## 5. Configuración Inicial

### 5.1 Primer Acceso

1. Abrir navegador en http://localhost (Docker) o http://localhost:4200 (Manual)
2. Hacer clic en "Registrarse"
3. Completar el formulario de registro
4. Verificar el correo electrónico (revisar la bandeja de entrada)
5. Introducir el código de verificación
6. Iniciar sesión con las credenciales creadas

### 5.2 Configuración de Email (Opcional para Desarrollo)

Si no se configura el email, algunas funcionalidades estarán limitadas:
- Verificación de cuenta por email
- Recuperación de contraseña

Para desarrollo, se puede desactivar temporalmente la verificación de email modificando el código del backend.

---

## 6. Verificación de la Instalación

### 6.1 Verificar Servicios con Docker

```bash
# Ver estado de contenedores
docker-compose ps

# Debería mostrar 4 servicios "Up":
# - ecotrack-mysql
# - ecotrack-backend
# - ecotrack-frontend
# - ecotrack-caddy (si está configurado)
```

### 6.2 Verificar Backend

```bash
# Comprobar health endpoint
curl http://localhost:8080/api/actuator/health

# Respuesta esperada: {"status":"UP"}
```

### 6.3 Verificar Frontend

Abrir navegador y verificar que:
- La página principal carga correctamente
- No hay errores en la consola del navegador (F12)
- Los estilos CSS se cargan correctamente

### 6.4 Verificar Base de Datos

```bash
# Conectar a MySQL (Docker)
docker exec -it ecotrack-mysql mysql -u ecotrack_user -p

# O conectar localmente
mysql -u ecotrack_user -p

# Verificar base de datos
USE ecotrack;
SHOW TABLES;

# Debería mostrar las tablas: Usuario, Consumo, Categoria, etc.
```

---

## 7. Solución de Problemas

### 7.1 Docker: Contenedor no inicia

**Error:** El contenedor se detiene inmediatamente.

**Solución:**
```bash
# Ver logs detallados
docker-compose logs nombre_del_servicio

# Ejemplo: docker-compose logs backend

# Reiniciar servicios
docker-compose restart

# Reconstruir si hay cambios
docker-compose down
docker-compose up --build -d
```

### 7.2 Backend: Error de conexión a MySQL

**Error:** `Communications link failure`

**Soluciones:**
1. Verificar que MySQL esté ejecutándose
2. Verificar credenciales en `application.properties` o `.env`
3. Verificar que el puerto 3306 no esté ocupado
4. En Docker, esperar a que MySQL esté completamente iniciado (30-60 segundos)

```bash
# Verificar salud de MySQL
docker-compose logs mysql
```

### 7.3 Frontend: Página en blanco

**Error:** La aplicación muestra una página vacía.

**Soluciones:**
1. Verificar la consola del navegador (F12) para errores
2. Verificar que el backend esté ejecutándose
3. Verificar la configuración de `apiUrl` en `environment.ts`
4. Limpiar caché del navegador

```bash
# Reconstruir frontend
cd Frontend/ecotrack
npm install
ng build
```

### 7.4 Email: No se envían correos

**Error:** Los emails de verificación no llegan.

**Soluciones:**
1. Verificar la configuración SMTP en `.env` o `application.properties`
2. Verificar que la contraseña de aplicación de Gmail sea correcta
3. Revisar la carpeta de spam
4. Verificar logs del backend para errores de email

```bash
docker-compose logs backend | grep -i mail
```

### 7.5 Puertos Ocupados

**Error:** `Port already in use`

**Soluciones:**
1. Cambiar el puerto en `.env` o `docker-compose.yml`
2. Detener el proceso que está usando el puerto

```bash
# Windows: Ver procesos en puerto
netstat -ano | findstr :8080

# Linux/Mac: Ver procesos en puerto
lsof -i :8080

# Detener contenedores
docker-compose down
```

### 7.6 Problemas de Permisos (Linux)

**Error:** `Permission denied`

**Soluciones:**
```bash
# Agregar usuario al grupo docker
sudo usermod -aG docker $USER
newgrp docker

# Dar permisos a directorios
sudo chown -R $USER:$USER .
```

---

## Comandos Útiles

### Docker

```bash
# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend

# Reiniciar un servicio
docker-compose restart backend

# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes (CUIDADO: Borra datos)
docker-compose down -v

# Ver estado de contenedores
docker-compose ps

# Acceder a la terminal de un contenedor
docker exec -it ecotrack-backend bash
```

### Backend (Manual)

```bash
# Compilar sin tests
mvn clean install -DskipTests

# Ejecutar con perfil específico
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# Ver logs
tail -f logs/ecotrack.log
```

### Frontend (Manual)

```bash
# Desarrollo con auto-reload
ng serve

# Compilar para producción
ng build --configuration production

# Limpiar caché de npm
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## Resumen de URLs

| Servicio | URL Desarrollo | URL Producción |
|----------|---------------|----------------|
| Frontend | http://localhost:4200 | https://tu-dominio.duckdns.org |
| Backend API | http://localhost:8080/api | https://tu-dominio.duckdns.org/api |
| Health Check | http://localhost:8080/api/actuator/health | https://tu-dominio.duckdns.org/api/actuator/health |
| MySQL | localhost:3306 | (interno) |

---

## Siguiente Paso

Una vez instalada la aplicación, consultar el [Manual de Usuario](manual_usuario.md) para aprender a utilizar todas las funcionalidades de EcoTrack.

Para información técnica y de desarrollo, revisar el [Manual del Programador](manual_programador.md).

---

*Manual de instalación creado para el Proyecto EcoTrack - DAW 2025/2026*
