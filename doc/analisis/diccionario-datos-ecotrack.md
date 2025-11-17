# Diccionario de Datos
# EcoTrack

**Autores:** Alejandro Sánchez Olivera, Marcos Blasco Serrano  
**Curso:** 2º Desarrollo de Aplicaciones Web  
**Fecha:** 18 de Noviembre de 2025  
**Versión:** 1.0

---

## Índice

1. [Introducción](#1-introducción)
2. [Convenciones](#2-convenciones)
3. [Tabla: USUARIO](#3-tabla-usuario)
4. [Tabla: CONSUMO](#4-tabla-consumo)
5. [Tabla: CATEGORIA](#5-tabla-categoria)
6. [Tabla: ESTADISTICA](#6-tabla-estadistica)
7. [Tabla: OBJETIVO](#7-tabla-objetivo)
8. [Relaciones](#8-relaciones)
9. [Índices](#9-índices)
10. [Restricciones](#10-restricciones)

---

## 1. Introducción

Este documento describe la estructura de la base de datos de **EcoTrack**, una aplicación web para registrar consumos energéticos y calcular la huella de carbono de los usuarios.

### Objetivo del proyecto
Permitir a los usuarios registrar sus consumos de agua, luz y gas, calcular automáticamente el CO₂ generado y establecer objetivos de reducción.

### Tecnologías
- **Base de datos:** MySQL 8.0 con phpMyAdmin
- **Motor:** InnoDB
- **Codificación:** UTF-8 (utf8mb4)
- **Backend:** PHP 8.x con MVC
- **Frontend:** HTML5, CSS3, JavaScript

---

## 2. Convenciones

### Nomenclatura de tablas
- En mayúsculas en la documentación: USUARIO, CONSUMO
- En minúsculas en la base de datos: usuario, consumo
- Siempre en singular

### Nomenclatura de campos
- Formato snake_case: nombre_usuario, fecha_inicio
- Claves primarias: id o id_nombretabla
- Claves foráneas: id_tablareferenciada

### Tipos de datos
- **INT:** Números enteros
- **DECIMAL(m,n):** Números decimales
- **VARCHAR(n):** Textos cortos
- **TEXT:** Textos largos
- **DATE:** Fechas
- **BOOLEAN:** Verdadero/Falso
- **ENUM:** Lista de valores predefinidos

---

## 3. Tabla: USUARIO

Almacena los datos de los usuarios registrados en la aplicación.

| Campo | Tipo | Nulo | Clave | Default | Descripción |
|-------|------|------|-------|---------|-------------|
| id | INT UNSIGNED | NO | PK | AUTO_INCREMENT | Identificador único del usuario |
| nombre | VARCHAR(100) | NO | - | - | Nombre completo del usuario |
| nombre_usuario | VARCHAR(50) | NO | UNIQUE | - | Username para login |
| contraseña | VARCHAR(255) | NO | - | - | Contraseña cifrada |
| telefono | VARCHAR(20) | SÍ | - | NULL | Teléfono de contacto |
| email | VARCHAR(100) | NO | UNIQUE | - | Correo electrónico |

### Restricciones
- PRIMARY KEY: id
- UNIQUE: nombre_usuario, email
- La contraseña debe estar cifrada con password_hash() de PHP

---

## 4. Tabla: CONSUMO

Registra los consumos energéticos de cada usuario.

| Campo | Tipo | Nulo | Clave | Default | Descripción |
|-------|------|------|-------|---------|-------------|
| id_consumo | INT | NO | PK | AUTO_INCREMENT | Identificador único del consumo |
| id_usuario | INT | NO | FK | - | Referencia al usuario |
| categoria | ENUM | NO | - | - | 'Agua', 'Electricidad', 'Gas' |
| cantidad | DECIMAL(10,2) | NO | - | - | Cantidad consumida |
| unidad | VARCHAR(20) | NO | - | - | Unidad de medida |
| fecha | DATE | NO | - | - | Fecha del consumo |
| co2_generado | DECIMAL(10,2) | SÍ | - | CALCULADO | CO₂ generado en kg |
| notas | TEXT | SÍ | - | NULL | Observaciones opcionales |

### Restricciones
- PRIMARY KEY: id_consumo
- FOREIGN KEY: id_usuario → usuario(id) ON DELETE CASCADE
- CHECK: cantidad > 0
- CHECK: categoria IN ('Agua', 'Electricidad', 'Gas')

### Cálculo automático
- co2_generado = cantidad × factor_co2 (de tabla CATEGORIA)

---

## 5. Tabla: CATEGORIA

Define las categorías de consumo y sus factores de conversión a CO₂.

| Campo | Tipo | Nulo | Clave | Default | Descripción |
|-------|------|------|-------|---------|-------------|
| id_categoria | INT | NO | PK | AUTO_INCREMENT | Identificador único |
| nombre | VARCHAR(50) | NO | UNIQUE | - | Nombre de la categoría |
| factor_co2 | DECIMAL(8,4) | NO | - | - | Factor de conversión a kg CO₂ |
| unidad_medida | VARCHAR(20) | NO | - | - | Unidad estándar |
| descripcion | TEXT | SÍ | - | NULL | Descripción detallada |

### Restricciones
- PRIMARY KEY: id_categoria
- UNIQUE: nombre
- CHECK: factor_co2 > 0

---

## 6. Tabla: ESTADISTICA

Almacena resúmenes mensuales de CO₂ por usuario.

| Campo | Tipo | Nulo | Clave | Default | Descripción |
|-------|------|------|-------|---------|-------------|
| id_estadistica | INT | NO | PK | AUTO_INCREMENT | Identificador único |
| id_usuario | INT | NO | FK | - | Referencia al usuario |
| mes | INT | NO | - | - | Mes (1-12) |
| año | INT | NO | - | - | Año |
| total_co2 | DECIMAL(10,2) | NO | - | 0 | Total CO₂ del mes en kg |
| promedio_diario | DECIMAL(8,2) | NO | - | 0 | Promedio diario de CO₂ |

### Restricciones
- PRIMARY KEY: id_estadistica
- FOREIGN KEY: id_usuario → usuario(id) ON DELETE CASCADE
- CHECK: mes BETWEEN 1 AND 12
- CHECK: año >= 2020
- UNIQUE: (id_usuario, mes, año)

---

## 7. Tabla: OBJETIVO

Registra los objetivos de reducción de CO₂ de los usuarios.

| Campo | Tipo | Nulo | Clave | Default | Descripción |
|-------|------|------|-------|---------|-------------|
| id_objetivo | INT | NO | PK | AUTO_INCREMENT | Identificador único |
| id_usuario | INT | NO | FK | - | Referencia al usuario |
| meta_co2 | DECIMAL(10,2) | NO | - | - | Meta de CO₂ máximo en kg |
| fecha_inicio | DATE | NO | - | - | Fecha de inicio |
| fecha_fin | DATE | NO | - | - | Fecha límite |
| completado | BOOLEAN | NO | - | FALSE | Si se cumplió el objetivo |
| descripcion | TEXT | SÍ | - | NULL | Descripción del objetivo |

### Restricciones
- PRIMARY KEY: id_objetivo
- FOREIGN KEY: id_usuario → usuario(id) ON DELETE CASCADE
- CHECK: meta_co2 > 0
- CHECK: fecha_fin > fecha_inicio

---

## 8. Relaciones

### USUARIO → CONSUMO (1:N)
- Un usuario tiene muchos consumos
- FK: consumo.id_usuario → usuario.id
- ON DELETE CASCADE

### USUARIO → ESTADISTICA (1:N)
- Un usuario tiene muchas estadísticas
- FK: estadistica.id_usuario → usuario.id
- ON DELETE CASCADE

### USUARIO → OBJETIVO (1:N)
- Un usuario tiene muchos objetivos
- FK: objetivo.id_usuario → usuario.id
- ON DELETE CASCADE

### CATEGORIA → CONSUMO (1:N)
- Una categoría tiene muchos consumos
- Relación a través de ENUM

---

## 9. Índices

### USUARIO
- PRIMARY KEY (id)
- UNIQUE (nombre_usuario)
- UNIQUE (email)

### CONSUMO
- PRIMARY KEY (id_consumo)
- INDEX (id_usuario)
- INDEX (fecha)
- INDEX (id_usuario, fecha)

### ESTADISTICA
- PRIMARY KEY (id_estadistica)
- INDEX (id_usuario)
- UNIQUE (id_usuario, mes, año)

### OBJETIVO
- PRIMARY KEY (id_objetivo)
- INDEX (id_usuario)

---

## 10. Restricciones

### Reglas de negocio
- No se puede repetir email ni nombre de usuario
- Todas las contraseñas están cifradas
- Los consumos deben ser positivos
- Las fechas de objetivos deben ser lógicas (fin > inicio)
- Solo una estadística por usuario por mes

### Integridad referencial
- ON DELETE CASCADE: Al eliminar un usuario se eliminan todos sus datos relacionados
- Claves foráneas garantizan que no existan registros huérfanos

### Cálculos automáticos
- co2_generado se calcula al registrar un consumo
- promedio_diario se calcula al crear estadísticas
- completado se actualiza al verificar objetivos

---
