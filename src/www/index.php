<?php
/**
 * index.php
 * 
 * Este archivo es como la “puerta de entrada” de toda la aplicación.
 * Aquí se carga la configuración, se ajusta el modo debug y se decide
 * qué controlador y método se deben ejecutar según los parámetros
 * que vengan por la URL.
 */

try {
    // Cargo el archivo de configuración donde están las rutas y ajustes
    $config = require_once('./config.php');

    // Dependiendo si está activado el modo debug, muestro los errores o no
    if ($config['debug']) {
        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        error_reporting(E_ALL);     // Muestra todos los errores
    } else {
        ini_set('display_errors', 0);
        ini_set('display_startup_errors', 0);
        error_reporting(0);         // No muestra errores al usuario
    }

    // Aquí miro qué controlador y qué método quiere usar el usuario
    // Si no pone nada en la URL, uso valores por defecto
    $controlador = $_GET['controlador'] ?? 'Controlador1';
    $metodo = $_GET['metodo'] ?? 'metodo1';

    // Carga del archivo del controlador que se pidió
    require_once($config['dir_controladores'] . strtolower($controlador) . '.php');

    // Aquí creo el controlador. En este caso siempre uso ControladorLogin,
    // aunque arriba se lee un nombre desde GET, pero creo que aún no está implementado.
    $controlador = new ControladorLogin($config);

    // Ejecuto el método que pidió el usuario (por ejemplo verRegistro o crearSesion)
    $controlador->$metodo();
    die();

} catch (Throwable $excepcion) {
    // Si algo falla en cualquier punto, se captura aquí
    header('HTTP/1.1 500 Internal Server Error');
    echo "Error: " . $excepcion->getMessage();
}
?>
