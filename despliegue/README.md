# 📦 ÍNDICE DE DESPLIEGUE - ECOTRACK

## 📂 Estructura Completa de Despliegue

```
despliegue/
│
├── 📄 docker-compose.yml (⭐ PRINCIPAL)
│   └─ Orquestación de todos los servicios
│      - MySQL (Base de datos)
│      - Spring Boot Backend (API)
│      - Angular Frontend (Web)
│      - Caddy (Proxy inverso HTTPS)
│
├── 📁 docker/
│   ├── Dockerfile.backend      → Spring Boot optimizado para producción
│   ├── Dockerfile.frontend     → Angular + Nginx SPA
│   └── Dockerfile.mysql        → MySQL preconfigurado
│
├── 📁 caddy/
│   └── Caddyfile               → Proxy inverso con HTTPS automático
│                                  Ruta /api → Backend
│                                  Ruta / → Frontend
│
├── 📁 nginx/
│   ├── nginx.conf              → Configuración principal
│   └── conf.d/
│       └── default.conf        → Configuración del sitio
│                                  SPA routing
│                                  Compresión Gzip
│                                  Security headers
│
├── 📁 database/
│   ├── initial.sql             → Creación de tablas
│   └── data.sql                → Datos de ejemplo
│
├── 📁 config/
│   ├── application-prod.properties  → Spring Boot producción
│   ├── .env.example                 → Template de variables
│   └── .env                         → Variables reales (no versionado)
│
├── 📁 scripts/
│   ├── init.sh                 → Inicializar proyecto
│   ├── deploy.sh               → Desplegar todo de una vez
│   ├── health-check.sh         → Verificar salud de servicios
│   └── pre-deployment-check.sh → Validar antes de desplegar
│
├── 📄 DEPLOYMENT_GUIDE.md      → Guía completa (100+ pasos)
├── 📄 QUICK_START.md           → Guía rápida (5 minutos)
├── 📄 CAMBIOS_REALIZADOS.md    → Documentación de cambios
└── 📄 .gitignore               → No versionarar .env, datos, etc.
```

---

## 🚀 PARA DESPLEGAR RÁPIDO

### Opción 1: Automated (Recomendado)
```bash
cd despliegue
bash scripts/deploy.sh
```
El script hace TODO automáticamente: verifica, construye, inicia y prueba.

### Opción 2: Manual
```bash
cd despliegue
cp config/.env.example .env
# Editar .env con tus valores
docker-compose build
docker-compose up -d
docker-compose logs -f
```

---

## 📋 CHECKLIST ANTES DE DESPLEGAR

### Sistema
- [ ] Docker 20.10+ instalado (`docker --version`)
- [ ] Docker Compose 1.29+ (`docker-compose --version`)
- [ ] Puertos 80 y 443 disponibles
- [ ] Conexión a internet (Let's Encrypt)

### Configuración
- [ ] `.env` creado con valores reales
- [ ] DuckDNS dominio creado
- [ ] Gmail app password generado
- [ ] Todas las variables `.env` completadas

### Requisitos Externos
- [ ] Dominio DuckDNS apuntando al servidor
- [ ] SMTP Gmail configurado
- [ ] Firewall/Router permite puertos 80, 443

---

## 📖 DOCUMENTACIÓN POR NECESIDAD

### ❓ Quiero desplegar rápido
→ Lee: **QUICK_START.md**

### ❓ Quiero entender qué se cambió
→ Lee: **CAMBIOS_REALIZADOS.md**

### ❓ Quiero instrucciones paso a paso
→ Lee: **DEPLOYMENT_GUIDE.md**

### ❓ Tengo un problema
→ Ve a: **DEPLOYMENT_GUIDE.md** → Troubleshooting

### ❓ Quiero ver la arquitectura completa
→ Lee: **README_DESPLIEGUE.md** (en raíz del proyecto)

---

## 🔧 CONFIGURACIÓN DE VARIABLES DE ENTORNO

### Archivo: `config/.env.example` → Copiar a `.env`

```bash
# DOMINIO Y EMAIL
DOMAIN=tu-dominio.duckdns.org          # Tu dominio DuckDNS
EMAIL=admin@ecotrack.com               # Email para SSL

# BASE DE DATOS
MYSQL_ROOT_PASSWORD=raiz_segura        # Contraseña root MySQL
MYSQL_USER=ecotrack_user               # Usuario BD
MYSQL_PASSWORD=usuario_segura          # Contraseña usuario BD

# EMAIL (Gmail SMTP)
MAIL_USERNAME=tu_email@gmail.com       # Tu email Gmail
MAIL_PASSWORD=app_password_aqui        # App password de Gmail

# CORS
CORS_ALLOWED_ORIGINS=https://dominio   # URL frontend

# PUERTOS
HTTP_PORT=80
HTTPS_PORT=443
```

**Obtener app password de Gmail:**
1. Ir a https://myaccount.google.com/apppasswords
2. Seleccionar "Mail" y "Windows/Linux/Mac"
3. Copiar password generado

---

## 🏗️ ARQUITECTURA IMPLEMENTADA

```
INTERNET (HTTPS)
        │
        ▼ ecotrack-pi.duckdns.org:443
    
    ┌─────────────────┐
    │     CADDY       │  Certificado Let's Encrypt
    │  Proxy Inverso  │  SSL/TLS Termination
    │    :80/:443     │  Rate limiting (opcional)
    └────────┬────────┘
             │
    ┌────────┴──────────┐
    │                   │
    ▼                   ▼
  
┌──────────────┐   ┌───────────────┐
│   FRONTEND   │   │   BACKEND     │
│ Angular+Nginx│   │  Spring Boot  │
│     :80      │   │     :8080     │
└──────┬───────┘   └────────┬──────┘
       │                    │
       └────────────────┬───┘
                        │
                        ▼
                    
                  ┌────────────┐
                  │   MYSQL    │
                  │   :3306    │
                  └────────────┘
```

**Flujo de solicitudes:**
1. Usuario accede a `https://dominio.duckdns.org/`
2. Caddy termina SSL y sabe que es ruta `/`
3. Caddy envía a Frontend (nginx) en puerto 80
4. Frontend sirve Angular compilado
5. Angular llama a `/api/...` endpoints
6. Caddy ve `/api` y envía a Backend en puerto 8080
7. Backend accede a MySQL internamente

---

## 🎯 SERVICIOS Y PUERTOS

| Servicio | Contenedor | Puerto Interno | Puerto Externo | Acceso |
|----------|-----------|----------------|----------------|--------|
| MySQL | ecotrack-mysql | 3306 | - | Solo red interna |
| Backend | ecotrack-backend | 8080 | - | Solo red interna |
| Frontend | ecotrack-frontend | 80 | - | Solo red interna |
| Caddy | ecotrack-caddy | 80/443 | 80/443 | Desde internet |

**Ventaja:** Los servicios internos no están directamente expuestos. Solo Caddy es accesible desde internet.

---

## 📊 VOLÚMENES PERSISTENTES

```
ecotrack-data/
├── mysql_data/          → BD MySQL (IMPORTANTE: RESPALDAR)
├── caddy_data/          → Certificados SSL
├── caddy_config/        → Configuración Caddy
└── logs/                → Logs de servicios
```

**Importante:** Estos directorios contienen datos valiosos. Hacer backups regularmente.

---

## ✅ VALIDACIONES AUTOMÁTICAS

### Health Checks Integrados

```
MySQL:   mysqladmin ping
Backend: /api/actuator/health
Frontend: GET http://localhost/health (200 OK)
Caddy:   Monitorea backends
```

Docker Compose automáticamente reinicia servicios que fallen.

---

## 🔐 SEGURIDAD IMPLEMENTADA

✅ **SSL/TLS**: Certificado automático (Let's Encrypt via Caddy)
✅ **CORS**: Dinámico por dominio (no hardcodeado)
✅ **Headers**: Security headers en Caddy y Nginx
✅ **No-root**: Todos contenedores sin privilegios
✅ **Network**: Red interna aislada
✅ **Secrets**: Variables sensibles en .env (no versionadas)
✅ **Logs**: Centralizados para auditoría

---

## 🛠️ HERRAMIENTAS ÚTILES

### Ver estado general
```bash
docker-compose ps
```

### Ver logs en tiempo real
```bash
docker-compose logs -f
```

### Acceder a MySQL CLI
```bash
docker-compose exec mysql mysql -u root -p
```

### Acceder a bash del backend
```bash
docker-compose exec backend bash
```

### Hacer backup de BD
```bash
docker-compose exec mysql mysqldump -u root -p ecotrack > backup.sql
```

### Reiniciar un servicio
```bash
docker-compose restart backend
```

### Ver métricas de uso
```bash
docker stats
```

---

## 📞 SOPORTE Y REFERENCIAS

### Documentación Oficial
- **Docker:** https://docs.docker.com/
- **Docker Compose:** https://docs.docker.com/compose/
- **Caddy:** https://caddyserver.com/docs/
- **Spring Boot:** https://spring.io/projects/spring-boot
- **Angular:** https://angular.io/
- **MySQL:** https://dev.mysql.com/doc/

### Archivos de Referencia en Este Proyecto
- `DEPLOYMENT_GUIDE.md` - Guía completa con todos los detalles
- `QUICK_START.md` - Para desplegar rápido
- `CAMBIOS_REALIZADOS.md` - Qué se cambió y por qué
- `../README_DESPLIEGUE.md` - Visión general del proyecto

---

## 🎓 ESTRUCTURA DE APRENDIZAJE RECOMENDADA

1. **Principiante**: Lee QUICK_START.md y ejecuta `deploy.sh`
2. **Intermedio**: Lee DEPLOYMENT_GUIDE.md secciones principales
3. **Avanzado**: Lee CAMBIOS_REALIZADOS.md y explora archivos de config
4. **Experto**: Modifica Dockerfiles, Caddyfile, application-prod.properties

---

## 📝 NOTAS IMPORTANTES

⚠️ **SEGURIDAD:**
- Cambiar TODAS las contraseñas antes de producción
- Usar HTTPS siempre (Caddy lo fuerza automáticamente)
- No commitear `.env` al repositorio
- Mantener backups actualizados

💡 **PERFORMANCE:**
- First deployment toma 5-10 minutos
- SSL certificate se genera automáticamente (2-5 minutos después de Caddy iniciarse)
- Frontend se cachea 30 días en navegador
- Backend usa connection pooling optimizado

🔄 **MANTENIMIENTO:**
- Revisar logs regularmente
- Hacer backups de BD frecuentemente
- Actualizar imágenes Docker periódicamente
- Monitorear uso de disco (mysql_data crece con datos)

---

## 🎯 ESTADO FINAL

✅ Proyecto completamente adaptado a producción
✅ Todos los servicios configurados y conectados
✅ Documentación completa y lista
✅ Scripts de automatización incluidos
✅ Seguridad implementada
✅ Ready to deploy

---

**Última actualización:** 25 de enero de 2026
**Versión:** 1.0 - Production Ready ✅

Para empezar: Lee `QUICK_START.md` o ejecuta `bash scripts/deploy.sh`
