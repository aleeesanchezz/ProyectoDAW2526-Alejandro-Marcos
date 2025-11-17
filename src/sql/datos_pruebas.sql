-- Script de datos de prueba
-- Proyecto: EcoTrack
-- Autores: Alejandro Sánchez Olivera, Marcos Blasco Serrano
-- Curso: 2º DAW
-- Fecha: Noviembre 2025

USE EcoTrack;

-- Usuarios de prueba para testing
-- NOTA: Todas las contraseñas son "password123" (cifradas)

INSERT INTO usuario (nombre, nombre_usuario, contraseña, telefono, email) VALUES
('Juan Pérez García', 'juanperez', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '612345678', 'juan.perez@example.com'),
('María López Sánchez', 'marialopez', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '623456789', 'maria.lopez@example.com'),
('Carlos Rodríguez Martín', 'carlosrod', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '634567890', 'carlos.rodriguez@example.com'),
('Ana García Fernández', 'anagarcia', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, 'ana.garcia@example.com'),
('Pedro Martínez González', 'pedromartinez', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '656789012', 'pedro.martinez@example.com');