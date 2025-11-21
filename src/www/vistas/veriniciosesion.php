<?php

    // Clase que gestiona la vista del formulario de inicio de sesión
    class InicioSesion{
        // Configuración del sistema (rutas de archivos, etc)
        private $config;
        // Mensaje de error o información para mostrar al usuario
        private $mensaje; 

        // Constructor que recibe configuración y opcionalmente un mensaje
        // Si no se pasa mensaje, por defecto será una cadena vacía
        public function __construct($config, $mensaje = ''){
            // Guardo la configuración en el atributo
            $this->config = $config;
            // Guardo el mensaje (puede ser error de login, etc)
            $this->mensaje = $mensaje;
        }

        // Método que renderiza el formulario de inicio de sesión
        public function mostrariniciosesion(){
            // Cargo el archivo HTML del formulario de login
            // Uso una ruta fija relativa al directorio de esta vista
            require_once(__DIR__ . '/html/sesion.html');
            // Detengo la ejecución para que solo se muestre esta vista
            die();
        }

        // Getter que devuelve el mensaje almacenado
        // La vista HTML puede llamar a este método con $this->getMensaje()
        public function getMensaje(){
            return $this->mensaje;
        }
    }
?>
