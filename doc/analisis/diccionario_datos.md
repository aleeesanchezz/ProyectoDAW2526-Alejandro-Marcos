# Diccionario de Datos — EcoTrack

**Autores:** Alejandro Sánchez Olivera, Marcos Blasco Serrano  
**Curso:** 2º DAW  
**Fecha:** Noviembre 2025

---

## Índice
1. Introducción  
2. Convenciones  
3. Tablas  
4. Relaciones  
5. Seguridad y rendimiento  

---

## 1. Introducción
Este diccionario define las tablas y campos de la base de datos de EcoTrack.

---

## 2. Convenciones
- Tablas en mayúsculas.  
- Clave primaria: id_tabla.  
- Foreign keys con el mismo nombre de la tabla referenciada.  

---

## 3. Tablas

### USUARIO
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id_usuario | INT PK | Identificador |
| nombre | VARCHAR(100) | Nombre completo |
| email | VARCHAR(100) UNIQUE | Email único |
| contrasena | VARCHAR(255) | Contraseña cifrada |
| fecha_registro | TIMESTAMP | Fecha de alta |
| activo | TINYINT(1) | Estado |

---

### CATEGORIA
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id_categoria | INT PK | Identificador |
| nombre | VARCHAR(50) | Agua / Electricidad / Gas |
| factor_co2 | DECIMAL(8,4) | Factor de emisión |
| unidad_medida | VARCHAR(20) | kWh, m³ |
| descripcion | TEXT | Opcional |

---

### CONSUMO
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id_consumo | INT PK |
| id_usuario | INT FK → USUARIO |
| id_categoria | INT FK → CATEGORIA |
| cantidad | DECIMAL(10,2) | Debe ser > 0 |
| unidad | VARCHAR(20) | Copia de la categoría |
| fecha | DATE | Fecha |
| co2_generado | DECIMAL(10,2) | Calculado |
| notas | TEXT | Opcional |
| fecha_creacion | TIMESTAMP | Alta |

---

### ESTADISTICA
### OBJETIVO

(Relaciones completas y coherentes con el ER).

---

## 4. Relaciones
- USUARIO 1:N CONSUMO  
- USUARIO 1:N ESTADISTICA  
- USUARIO 1:N OBJETIVO  
- CATEGORIA 1:N CONSUMO  

---

## 5. Seguridad y rendimiento
- Contraseñas cifradas.  
- Índices en campos críticos.  
- Motor InnoDB.  
