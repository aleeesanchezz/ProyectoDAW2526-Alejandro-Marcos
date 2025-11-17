# EcoTrack — Documentación del Proyecto

**Autores:** Alejandro Sánchez Olivera, Marcos Blasco Serrano  
**Curso:** 2º DAW  
**Fecha:** Noviembre 2025

---

## Índice
1. Descripción general  
2. Documentos incluidos  
3. Tecnologías usadas  
4. Estructura del proyecto  
5. Cómo utilizar esta documentación  

---

## 1. Descripción general
EcoTrack es una aplicación web que permite registrar consumos de agua, luz y gas, calcular sus emisiones de CO₂ y mostrar un panel con la evolución del usuario mes a mes. El objetivo del proyecto es ofrecer una herramienta sencilla, clara y útil, con un diseño humano y cercano, pero técnicamente correcto.

---

## 2. Documentos incluidos
El paquete contiene los siguientes archivos:

- **product_backlog.md** — Historias de usuario, criterios de aceptación y prioridades.  
- **diccionario_datos.md** — Tablas, campos, restricciones y relaciones.  
- **arquitectura_tecnologica.md** — Explicación de la arquitectura Angular + PHP + MySQL.  
- **diagrama_er.pdf** — Diagrama Entidad–Relación en PDF.  
- **guia_estilos.md** — Documento original de estilos del proyecto.

Todos los archivos están escritos sin marcas internas ni texto extraño, listos para entrega oficial.

---

## 3. Tecnologías usadas
**Frontend**: Angular  
**Backend**: PHP 8 + Apache  
**Base de datos**: MySQL 8 (InnoDB)

---

## 4. Estructura del proyecto
```
ecotrack/
 ├── docs/
 │   ├── product_backlog.md
 │   ├── diccionario_datos.md
 │   ├── arquitectura_tecnologica.md
 │   ├── diagrama_er.pdf
 │   └── guia_estilos.md
 ├── frontend/        # Angular
 ├── backend/         # PHP
 └── database/
```

---

## 5. Cómo usar esta documentación
1. Revisa el README para orientarte.  
2. Empieza por el **product backlog** para entender las funciones clave.  
3. Consulta el **diccionario de datos** mientras programas consultas o modelos.  
4. Usa la **arquitectura** para estructurar el proyecto correctamente.  
5. Sigue la **guía de estilos** cuando diseñes la interfaz.

