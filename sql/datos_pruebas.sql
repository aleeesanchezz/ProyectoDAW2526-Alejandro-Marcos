-- Script de datos de prueba
-- Proyecto: EcoTrack
-- Autores: Alejandro Sánchez Olivera, Marcos Blasco Serrano
-- Curso: 2º DAW
-- Fecha: Noviembre 2025

USE EcoTrack;

-- Usuarios de prueba para testing
-- NOTA: Todas las contraseñas son "password123" (cifradas)

INSERT INTO usuario (nombre, nombre_usuario, contraseña, email) VALUES
('Juan Pérez García', 'juanperez', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'juan.perez@example.com'),
('María López Sánchez', 'marialopez', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'maria.lopez@example.com'),
('Carlos Rodríguez Martín', 'carlosrod', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'carlos.rodriguez@example.com'),
('Ana García Fernández', 'anagarcia', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ana.garcia@example.com'),
('Pedro Martínez González', 'pedromartinez', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'pedro.martinez@example.com');

-- Notas de prueba
-- NOTA: Asociadas a los usuarios de prueba

INSERT INTO nota (id_usuario, titulo, contenido, color) VALUES
(1, 'Recordatorio: Reducir consumo eléctrico', 'Apagar luces y electrodomésticos cuando no se usen. Meta: reducir 20% este mes.', '#FFE6E6'),
(1, 'Objetivo mensual', 'Revisar el dashboard cada semana para monitorear el progreso.', '#E6F3FF'),
(2, 'Ideas para reducir huella de carbono', 'Usar transporte público, reducir consumo de carne, reciclar más.', '#E6FFE6'),
(2, 'Compras sostenibles', 'Comprar productos locales y de temporada. Evitar envases de plástico.', '#FFFBE6'),
(3, 'Progreso enero', 'He logrado reducir 15% del consumo eléctrico comparado con diciembre.', '#F0E6FF'),
(3, 'Mejoras en el hogar', 'Instalar bombillas LED en todas las habitaciones.', '#FFE6F0'),
(4, 'Objetivos 2026', 'Reducir huella de carbono en 30% para fin de año.', '#E6FFFF'),
(4, 'Registro importante', 'Comparar consumos mensuales para identificar patrones.', '#FFF0E6'),
(5, 'Consejos útiles', 'Usar electrodomésticos eficientes, regular termostato, aislar ventanas.', '#FFE6E6'),
(5, 'Tracking semanal', 'Revisar estadísticas cada domingo y ajustar hábitos según resultados.', '#E6F3FF');