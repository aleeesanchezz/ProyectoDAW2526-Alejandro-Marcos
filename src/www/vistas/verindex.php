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
            // Incluyo el archivo HTML de forma robusta usando __DIR__
            require_once(__DIR__ . '/html/index.html');
            die();
        }

    }
?>
