<?php
/**
 * index.php
 * Responsabilidades:
 *      - Cargar la configuración
 *      - Middleware: autenticación, logging
 */
try {
    $config = require_once('./config.php');

    // Configuración inicial
    if ($config['debug']) {
        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        error_reporting(E_ALL);
    } else {
        ini_set('display_errors', 0);
        ini_set('display_startup_errors', 0);
        error_reporting(0);
    }

    // Procesar la petición
    $controlador = $_GET['controlador'] ?? 'Controlador1';
    $metodo = $_GET['metodo'] ?? 'metodo1';

    require_once($config['dir_controladores'].strtolower($controlador).'.php');

    $controlador = new ControladorLogin($config);
    $controlador->$metodo();
    die();

} catch (Throwable $excepcion) {
    header('HTTP/1.1 500 Internal Server Error');
    echo "Error: " . $excepcion->getMessage();
}
?>