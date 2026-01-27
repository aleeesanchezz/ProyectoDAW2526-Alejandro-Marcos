-- Script de datos de prueba
-- Proyecto: EcoTrack
-- Autores: Alejandro Sánchez Olivera, Marcos Blasco Serrano
-- Curso: 2º DAW
-- Fecha: Enero 2025
USE EcoTrack;

-- ============================================
-- TABLA: usuario
-- ============================================
-- Usuarios de prueba para testing
-- NOTA: Todas las contraseñas son "password123" (cifradas)
INSERT INTO usuario (nombre, apellidos, nombre_usuario, password, email) VALUES
('Juan', 'Pérez García', 'juanperez', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'juan.perez@example.com'),
('María', 'López Sánchez', 'marialopez', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'maria.lopez@example.com'),
('Carlos', 'Rodríguez Martín', 'carlosrod', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'carlos.rodriguez@example.com'),
('Ana', 'García Fernández', 'anagarcia', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ana.garcia@example.com'),
('Pedro', 'Martínez González', 'pedromartinez', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'pedro.martinez@example.com');

-- ============================================
-- TABLA: consumo
-- ============================================
-- Consumos de prueba para los usuarios
INSERT INTO consumo (fecha, categoria, cantidad, unidad, co2, notas, id_usuario) VALUES
-- Consumos de Juan Pérez (id: 2)
('2025-01-15', 'Electricidad', 180.5, 'kWh', 90.25, 'Consumo eléctrico enero', 2),
('2025-01-18', 'Gas Natural', 55.0, 'm³', 110.0, 'Calefacción invierno', 2),
('2025-01-20', 'Transporte', 250.0, 'km', 60.0, 'Viajes en coche diésel', 2),
('2025-01-25', 'Agua', 12.0, 'm³', 3.6, 'Consumo mensual de agua', 2),

-- Consumos de María López (id: 3)
('2025-01-10', 'Electricidad', 145.0, 'kWh', 72.5, 'Consumo bajo por eficiencia', 3),
('2025-01-14', 'Transporte', 80.0, 'km', 19.2, 'Uso de transporte público', 3),
('2025-01-22', 'Alimentación', 8.5, 'kg', 21.25, 'Compra semanal con carne', 3),
('2025-01-26', 'Gas Natural', 30.0, 'm³', 60.0, 'Cocina y agua caliente', 3),

-- Consumos de Carlos Rodríguez (id: 4)
('2025-01-12', 'Electricidad', 220.0, 'kWh', 110.0, 'Alto consumo por home office', 4),
('2025-01-16', 'Transporte', 450.0, 'km', 108.0, 'Viajes largos trabajo', 4),
('2025-01-19', 'Alimentación', 12.0, 'kg', 30.0, 'Consumo alto de proteína animal', 4),
('2025-01-24', 'Agua', 18.0, 'm³', 5.4, 'Consumo familiar numerosa', 4),

-- Consumos de Ana García (id: 5)
('2025-01-11', 'Electricidad', 95.0, 'kWh', 47.5, 'Consumo muy eficiente', 5),
('2025-01-17', 'Transporte', 60.0, 'km', 14.4, 'Uso de bicicleta eléctrica', 5),
('2025-01-21', 'Alimentación', 4.0, 'kg', 10.0, 'Dieta vegetariana', 5),
('2025-01-23', 'Gas Natural', 20.0, 'm³', 40.0, 'Uso mínimo calefacción', 5),

-- Consumos de Pedro Martínez (id: 6)
('2025-01-13', 'Electricidad', 165.0, 'kWh', 82.5, 'Consumo medio residencial', 6),
('2025-01-15', 'Transporte', 320.0, 'km', 76.8, 'Combinación coche/tren', 6),
('2025-01-20', 'Agua', 15.0, 'm³', 4.5, 'Consumo estándar hogar', 6),
('2025-01-27', 'Alimentación', 6.5, 'kg', 16.25, 'Dieta mixta equilibrada', 6);

-- ============================================
-- TABLA: objetivo_reduccion
-- ============================================
-- Objetivos de reducción de prueba
INSERT INTO objetivo_reduccion (descripcion, meta_co2, fecha_inicio, fecha_fin, estado, id_usuario) VALUES
-- Objetivos de Juan Pérez (id: 2)
('Reducir consumo eléctrico en un 15%', 400.0, '2025-01-01', '2025-06-30', 'En progreso', 2),
('Reducir uso del coche privado', 200.0, '2025-02-01', '2025-12-31', 'En progreso', 2),

-- Objetivos de María López (id: 3)
('Alcanzar neutralidad de carbono', 300.0, '2025-01-01', '2025-12-31', 'En progreso', 3),
('Reducir consumo de carne en un 50%', 100.0, '2025-01-15', '2025-07-15', 'En progreso', 3),

-- Objetivos de Carlos Rodríguez (id: 4)
('Optimizar climatización del hogar', 500.0, '2025-01-01', '2025-12-31', 'En progreso', 4),
('Reducir viajes en coche un 30%', 350.0, '2024-12-01', '2025-05-31', 'En progreso', 4),

-- Objetivos de Ana García (id: 5)
('Mantener huella de carbono baja', 150.0, '2025-01-01', '2025-12-31', 'En progreso', 5),
('Transición a 100% renovables', 80.0, '2025-01-01', '2025-06-30', 'En progreso', 5),

-- Objetivos de Pedro Martínez (id: 6)
('Reducir emisiones totales en 25%', 450.0, '2025-01-01', '2025-12-31', 'En progreso', 6),
('Optimizar consumo de agua', 50.0, '2025-02-01', '2025-08-31', 'En progreso', 6),
('Cambiar a vehículo híbrido', 300.0, '2024-11-01', '2025-10-31', 'Completado', 6);

-- ============================================
-- TABLA: password_reset_token
-- ============================================
-- Tokens de recuperación de contraseña de prueba
INSERT INTO password_reset_token (token, tiempo_expiracion, usuario_id) VALUES
-- Token para Juan Pérez (válido 1 hora)
('$2y$10$abc123DEF456ghi789JKL012mno345PQR678stu901VWX234YZabcde', DATE_ADD(NOW(), INTERVAL 1 HOUR), 2),

-- Token para María López (válido 1 hora)
('$2y$10$xyz987WVU654tsr321PON098mlk765IHG432fed109CBA876zyxwvu', DATE_ADD(NOW(), INTERVAL 1 HOUR), 3),

-- Token para Carlos Rodríguez (expirado - para pruebas)
('$2y$10$old111AAA222bbb333CCC444ddd555EEE666fff777GGG888hhhiii', DATE_SUB(NOW(), INTERVAL 2 HOUR), 4),

-- Token para Ana García (válido 30 minutos)
('$2y$10$new999ZZZ888yyy777XXX666www555VVV444uuu333TTT222sssrrr', DATE_ADD(NOW(), INTERVAL 30 MINUTE), 5),

-- Token para Pedro Martínez (válido 2 horas)
('$2y$10$tkn555QQQ666ppp777OOO888nnn999MMM000lll111KKK222jjjiii', DATE_ADD(NOW(), INTERVAL 2 HOUR), 6);