<?php

    class InicioSesion{
        private $config;
        private $mensaje; 

        public function __construct($config, $mensaje = ''){
            $this->config = $config;
            $this->mensaje = $mensaje;
        }

        public function mostrariniciosesion(){
            require_once($this->config['dir_html'].'sesion.html');
            die();
        }

        public function getMensaje(){
            return $this->mensaje;
        }
    }
?>  