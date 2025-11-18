<?php
// Clase que gestiona la vista del formulario de registro de nuevos usuarios
class NuevoRegistro {
    // Almacena la configuración del sistema (rutas, parámetros, etc)
    private $config;
    // Almacena mensajes de error o éxito para mostrar en el formulario
    private $mensaje;

    // Constructor que inicializa la clase con configuración y mensaje opcional
    // El mensaje por defecto es vacío si no se pasa ninguno
    public function __construct($config, $mensaje = '') {
        // Asigno la configuración recibida al atributo
        $this->config = $config;
        // Asigno el mensaje (errores de validación, usuario duplicado, etc)
        $this->mensaje = $mensaje;
    }

    // Método que renderiza el formulario de registro
    public function mostrarRegistro() {
        // Incluyo el archivo HTML del formulario usando la ruta de configuración
        // Concateno la ruta base con el nombre del archivo
        require_once($this->config['dir_html'].'registro.html');
        // Finalizo la ejecución para evitar que se procese más código
        die();
    }

    // Método getter que devuelve el mensaje almacenado
    // Permite que la vista HTML acceda al mensaje mediante PHP embebido
    public function getMensaje() {
        return $this->mensaje;
    }
}
?>
