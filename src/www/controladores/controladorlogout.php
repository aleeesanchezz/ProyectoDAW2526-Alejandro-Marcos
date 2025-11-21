<?php
// Logout mínimo: acepta POST; si se recibe POST destruye la sesión y muestra login
$config = require_once(__DIR__ . '/../config.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	if (session_status() === PHP_SESSION_NONE) {
		session_start();
	}

	// Vaciar y destruir sesión
	session_unset();
	session_destroy();
	// Redirigir al index principal para que las rutas relativas del login funcionen
	header('Location: ../index.php');
	exit();
}

// Mostrar vista de inicio de sesión
require_once(__DIR__ . '/../vistas/veriniciosesion.php');
$vista = new InicioSesion($config);
$vista->mostrariniciosesion();
?>

