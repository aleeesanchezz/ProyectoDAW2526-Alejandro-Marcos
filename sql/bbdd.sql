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

-- Las tablas se crean automticamente al iniciar el backend gracias a JPA 
