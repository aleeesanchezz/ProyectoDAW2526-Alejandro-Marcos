<?php

    // Clase que gestiona la visualización de la página principal
    class VerIndex{
        // Atributo privado que almacena la configuración del sistema (rutas, etc)
        private $config;

        // Constructor que recibe el array de configuración
        public function __construct($config){
            // Asigno la configuración recibida al atributo de la clase
            $this->config = $config;
        }

        // Método que muestra la página principal (index.html)
        public function verIndex(){
            // Incluyo el archivo HTML usando la ruta definida en la configuración
            // require_once evita que se incluya el mismo archivo varias veces
            require_once($this->config['dir_html']).'index.html';
            // die() detiene la ejecución del script después de mostrar la vista
            // Esto previene que se ejecute código adicional no deseado
            die();
        }

    }
?>
