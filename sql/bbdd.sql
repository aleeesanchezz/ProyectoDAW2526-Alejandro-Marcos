-- Script de creación de la base de datos
-- Proyecto: EcoTrack
-- Autores: Alejandro Sánchez Olivera, Marcos Blasco Serrano
-- Curso: 2º DAW
-- Fecha: Noviembre 2025

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS EcoTrack

-- Usar la base de datos
USE EcoTrack;

-- Crear usuario administrador
CREATE USER IF NOT EXISTS 'admin'@'localhost' IDENTIFIED BY 'admin';

-- Dar permisos al administrador
GRANT ALL PRIVILEGES ON EcoTrack.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;

-- Crear la tabla usuario
CREATE TABLE IF NOT EXISTS usuario (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    nombre_usuario VARCHAR(50) NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (nombre_usuario),
    UNIQUE (email)
);

-- Crear la tabla nota
CREATE TABLE IF NOT EXISTS nota (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    id_usuario INT UNSIGNED NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    contenido TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    color VARCHAR(20) DEFAULT '#FFFFFF',
    PRIMARY KEY (id),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE
); 
