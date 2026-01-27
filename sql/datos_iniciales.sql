-- Script de datos iniciales
-- Proyecto: EcoTrack
-- Autores: Alejandro Sánchez Olivera, Marcos Blasco Serrano
-- Curso: 2º DAW
-- Fecha: Enero 2025
USE EcoTrack;

-- ============================================
-- TABLA: usuario
-- ============================================
-- Usuario administrador del sistema
-- Contraseña: admin123 (cifrada con password_hash de PHP)
INSERT INTO usuario (nombre, apellidos, nombre_usuario, password, email) VALUES
('Administrador', 'del Sistema', 'admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@ecotrack.com');

-- ============================================
-- TABLA: consumo
-- ============================================
-- Consumo de ejemplo del administrador
INSERT INTO consumo (fecha, categoria, cantidad, unidad, co2, notas, id_usuario) VALUES
('2025-01-27', 'Electricidad', 150.0, 'kWh', 75.0, 'Consumo eléctrico mensual', 1);

-- ============================================
-- TABLA: objetivo_reduccion
-- ============================================
-- Objetivo de reducción de ejemplo del administrador
INSERT INTO objetivo_reduccion (descripcion, meta_co2, fecha_inicio, fecha_fin, estado, id_usuario) VALUES
('Reducir emisiones de CO2 en un 20%', 500.0, '2025-01-01', '2025-12-31', 'En progreso', 1);

-- ============================================
-- TABLA: password_reset_token
-- ============================================
-- Token de ejemplo para recuperación de contraseña
-- Token: abc123xyz456 (ejemplo)
-- Expira en 1 hora desde ahora
INSERT INTO password_reset_token (token, tiempo_expiracion, usuario_id) VALUES
('$2y$10$abcdefghijklmnopqrstuvwxyz123456789ABCDEFGHIJKLMNO', DATE_ADD(NOW(), INTERVAL 1 HOUR), 1);