<?php
class NuevoRegistro {
    private $config;
    private $mensaje;

    public function __construct($config, $mensaje = '') {
        $this->config = $config;
        $this->mensaje = $mensaje;
    }

    public function mostrarRegistro() {
        require_once($this->config['dir_html'].'registro.html');
        die();
    }

    public function getMensaje() {
        return $this->mensaje;
    }
}
?>
