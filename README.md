# Usar la versión de desarrollo

# EcoTrack — Documentación del Proyecto

**Autores:** Alejandro Sánchez Olivera, Marcos Blasco Serrano  
**Curso:** 2º DAW  
**Fecha:** Enero 2026

---

## Índice
1. Descripción general  
2. Documentos incluidos  
3. Tecnologías usadas  
4. Estructura del proyecto  
5. Requisitos del sistema
6. Instalación y ejecución
7. Cómo utilizar esta documentación  

---

## 1. Descripción general
EcoTrack es una aplicación web de sostenibilidad que permite a los usuarios registrar consumos de agua, luz y gas, calcular sus emisiones de CO₂ equivalentes y visualizar la evolución de su consumo mes a mes mediante dashboards interactivos. Incluye funcionalidades de objetivos de reducción, notas de consumo e históricos detallados. El objetivo del proyecto es ofrecer una herramienta sencilla, clara y útil, con un diseño humano y cercano, pero técnicamente correcto.

---

## 2. Documentos incluidos
El paquete contiene los siguientes archivos y carpetas:

**Documentación técnica:**
- **doc/** — Carpeta con documentación completa:
  - `DOCUMENTACION_TFG_COMPLETA.md` — Documentación integral del proyecto
  - `analisis/` — Análisis de arquitectura, diagramas ER y diccionario de datos
  - `diseño/` — Guía de estilos y bocetos del proyecto
  - `manual/` — Manuales de instalación, usuario y programador
  - `sprints/` — Documentación de sprints realizados

**Despliegue:**
- **despliegue/** — Configuración de Docker y scripts de despliegue con Docker Compose, Caddy y Nginx

**Base de datos:**
- **sql/** — Scripts SQL iniciales y de pruebas

**Código fuente:**
- **Backend/** — Aplicación Spring Boot con Java 21
- **Frontend/** — Aplicación Angular 16

---

## 3. Tecnologías usadas

| Componente | Tecnología | Versión |
|-----------|-----------|---------|
| **Frontend** | Angular | 16.2.0 |
| **Backend** | Spring Boot | 3.3.5 |
| **Lenguaje (Backend)** | Java | 21 |
| **Base de datos** | MySQL | 8.0 (InnoDB) |
| **ORM** | JPA/Hibernate | Spring Data JPA |
| **Seguridad** | Spring Security | 3.3.5 |
| **Build (Backend)** | Maven | 3.x |
| **Contenedorización** | Docker | Docker Compose |
| **Proxy Inverso** | Caddy/Nginx | Últimas versiones |

---

## 4. Estructura del proyecto
```
ProyectoDAW2526-Alejandro-Marcos/
 ├── Backend/
 │   └── ecotrack-backend/
 │       └── ecotrack-backend/
 │           ├── pom.xml                    # Configuración Maven
 │           ├── mvnw / mvnw.cmd            # Maven Wrapper
 │           └── src/
 │               ├── main/
 │               │   ├── java/              # Código fuente Java
 │               │   └── resources/         # Configuración y recursos
 │               └── test/
 │
 ├── Frontend/
 │   └── ecotrack/
 │       ├── package.json                   # Dependencias Node
 │       ├── angular.json                   # Configuración Angular
 │       ├── tsconfig.json                  # Configuración TypeScript
 │       └── src/
 │           ├── index.html
 │           ├── main.ts
 │           ├── styles.css
 │           ├── app/                       # Componentes Angular
 │           ├── assets/                    # Imágenes y recursos
 │           └── environments/              # Configuración por entorno
 │
 ├── despliegue/
 │   ├── docker-compose.yml                 # Orquestación contenedores
 │   ├── docker/                            # Dockerfiles
 │   ├── config/                            # Configuración producción
 │   ├── database/                          # Scripts SQL
 │   ├── caddy/ o nginx/                    # Proxy inverso
 │   └── scripts/                           # Scripts de despliegue
 │
 ├── doc/                                   # Documentación completa
 ├── sql/                                   # Scripts SQL iniciales
 │
 └── README.md (este archivo)
```

---

## 5. Requisitos del sistema

**Para desarrollo local:**
- Java 21 JDK o superior
- Node.js 18+ y npm 9+
- MySQL 8.0+
- Git

**Para despliegue:**
- Docker 20.10+
- Docker Compose 2.0+
- Mínimo 2GB RAM disponible
- Puertos 80 y 443 disponibles (o configurados según necesidad)

---

## 6. Instalación y ejecución

### Desarrollo local

**Backend (Spring Boot):**
```bash
cd Backend/ecotrack-backend/ecotrack-backend
./mvnw spring-boot:run
# O en Windows: mvnw.cmd spring-boot:run
```
Backend disponible en: `http://localhost:8080`

**Frontend (Angular):**
```bash
cd Frontend/ecotrack
npm install
npm start
# O: ng serve
```
Frontend disponible en: `http://localhost:4200`

**Base de datos:**
- Crear base de datos MySQL: `ecotrack`
- Ejecutar scripts en `sql/`:
  1. `bbdd.sql` — Crear estructura
  2. `datos_iniciales.sql` — Datos base
  3. `datos_pruebas.sql` (opcional) — Datos de prueba

### Despliegue con Docker

```bash
cd despliegue
docker-compose up -d
```

Acceder a través de:
- Frontend: `https://ecotrack.local` (o la URL configurada)
- Backend API: `https://ecotrack.local/api`

Ver scripts de utilidad en `despliegue/scripts/`:
- `deploy.sh` — Despliegue completo
- `health-check.sh` — Verificar estado
- `stop.sh` — Detener servicios
- `limpiar.sh` — Limpiar contenedores

---

## 7. Cómo usar esta documentación

1. **Primeros pasos**: Lee este README para una visión general.
2. **Para entender el proyecto**: Consulta `doc/DOCUMENTACION_TFG_COMPLETA.md`
3. **Para estructura técnica**: Revisa `doc/analisis/arquitectura_tecnologica.md`
4. **Para desarrollar**:
   - Consulta `doc/manual/manual_programador.md`
   - Revisa el diccionario de datos en `doc/analisis/diccionario-datos-ecotrack.md`
5. **Para usar la aplicación**: Guía en `doc/manual/manual_usuario.md`
6. **Para desplegar**: Lee `GUIA_RAPIDA_DESPLIEGUE.md` y `despliegue/README.md`
7. **Para estilos**: Sigue `doc/diseño/guia_estilos_ecotrack.html`

---

## Notas importantes

- La aplicación usa **Spring Boot** para el backend (no PHP)
- Spring Security está integrado para autenticación
- La base de datos usa JPA/Hibernate como ORM
- El frontend comunica con el backend mediante API REST
- El despliegue utiliza Docker para garantizar consistencia entre entornos
- Ver `CHECKLIST_PRE_DESPLIEGUE.md` antes de producción

