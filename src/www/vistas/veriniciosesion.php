<?php

    class InicioSesion{
        private $config;

        public function __construct($config){
            $this->config = $config;
        }

        public function mostrariniciosesion(){
            require_once($this->config['dir_html'].'sesion.html');
            die();
        }
    }
?>  