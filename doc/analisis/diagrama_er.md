# Diagrama Entidad-Relación
# EcoTrack

**Autores:** Alejandro Sánchez Olivera, Marcos Blasco Serrano  
**Curso:** 2º DAW  
**Fecha:** Noviembre 2025

---

## Leyenda

- **PK** - Primary Key
- **FK** - Foreign Key
- **1:N** - Uno a Muchos
- **NOT NULL** - Campo obligatorio

---

## USUARIO

| Campo | Tipo | Restricciones |
|-------|------|---------------|
| id | INT | PK, AUTO_INCREMENT, UNSIGNED |
| nombre | VARCHAR(100) | NOT NULL |
| nombre_usuario | VARCHAR(50) | NOT NULL, UNIQUE |
| contraseña | VARCHAR(255) | NOT NULL (cifrada) |
| telefono | VARCHAR(20) | NULL |
| email | VARCHAR(100) | NOT NULL, UNIQUE |

---

## CONSUMO

| Campo | Tipo | Restricciones |
|-------|------|---------------|
| id_consumo | INT | PK, AUTO_INCREMENT |
| id_usuario | INT | FK → USUARIO |
| categoria | ENUM | 'Agua', 'Electricidad', 'Gas' |
| cantidad | DECIMAL(10,2) | NOT NULL, > 0 |
| unidad | VARCHAR(20) | NOT NULL |
| fecha | DATE | NOT NULL |
| co2_generado | DECIMAL(10,2) | Calculado automático |
| notas | TEXT | NULL |

---

## CATEGORIA

| Campo | Tipo | Restricciones |
|-------|------|---------------|
| id_categoria | INT | PK, AUTO_INCREMENT |
| nombre | VARCHAR(50) | NOT NULL, UNIQUE |
| factor_co2 | DECIMAL(8,4) | NOT NULL, > 0 |
| unidad_medida | VARCHAR(20) | NOT NULL |
| descripcion | TEXT | NULL |

---

## ESTADISTICA

| Campo | Tipo | Restricciones |
|-------|------|---------------|
| id_estadistica | INT | PK, AUTO_INCREMENT |
| id_usuario | INT | FK → USUARIO |
| mes | INT | 1-12 |
| año | INT | >= 2020 |
| total_co2 | DECIMAL(10,2) | DEFAULT 0 |
| promedio_diario | DECIMAL(8,2) | DEFAULT 0 |

---

## OBJETIVO

| Campo | Tipo | Restricciones |
|-------|------|---------------|
| id_objetivo | INT | PK, AUTO_INCREMENT |
| id_usuario | INT | FK → USUARIO |
| meta_co2 | DECIMAL(10,2) | NOT NULL, > 0 |
| fecha_inicio | DATE | NOT NULL |
| fecha_fin | DATE | NOT NULL |
| completado | BOOLEAN | DEFAULT FALSE |
| descripcion | TEXT | NULL |

---

## Relaciones

| Desde | Hacia | Tipo | Descripción |
|-------|-------|------|-------------|
| USUARIO | CONSUMO | 1:N | Un usuario tiene muchos consumos |
| USUARIO | ESTADISTICA | 1:N | Un usuario tiene muchas estadísticas |
| USUARIO | OBJETIVO | 1:N | Un usuario tiene muchos objetivos |
| CATEGORIA | CONSUMO | 1:N | Una categoría tiene muchos consumos |

---

## Notas

- MySQL 8.0 con motor InnoDB
- Codificación UTF-8 (utf8mb4)
- ON DELETE CASCADE en todas las FK
- El CO₂ se calcula automáticamente
- Índices en: email, id_usuario, fecha
