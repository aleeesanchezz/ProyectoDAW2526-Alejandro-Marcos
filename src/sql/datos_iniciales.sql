-- Script de datos iniciales
-- Proyecto: EcoTrack
-- Autores: Alejandro Sánchez Olivera, Marcos Blasco Serrano
-- Curso: 2º DAW
-- Fecha: Noviembre 2025

USE EcoTrack;

-- Usuario administrador del sistema
-- Contraseña: admin123 (cifrada con password_hash de PHP)
INSERT INTO usuario (nombre, nombre_usuario, contraseña, email) VALUES
('Administrador del Sistema', 'admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@ecotrack.com');