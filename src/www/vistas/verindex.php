<?php

    class VerIndex{
        private $config;

        public function __construct($config){
            $this->config = $config;
        }

        public function verIndex(){
            require_once($this->config['dir_html']).'index.html';
            die();
        }

    }
?>