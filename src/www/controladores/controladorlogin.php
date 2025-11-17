<?php
class ControladorLogin {
    private $config;

    public function __construct($config) {
        $this->config = $config;
    }

    public function verRegistro(){
        require_once($this->config['dir_vistas'].'verRegistro.php');
        $vista = new NuevoRegistro($this->config);
        $vista->mostrarRegistro();
    }

   
    public function alta() {
        try {
            $nombre = $_POST['nombre'];
            $nombreusuario = $_POST['nombreUsuario'];
            $contraseña = $_POST['contraseña'];
            $telefono = $_POST['telefono'];
            $email = $_POST['email'];

            require_once($this->config['dir_modelos'].'usuario.php');
            $usuario = new Usuario($nombre, $nombreusuario, $contraseña, $telefono, $email);

            // Verificar si ya existe el nombre de usuario o email
            $existe = $usuario->existeUsuarioOCorreo();
            if ($existe['usuario'] || $existe['email']) {
                $mensaje = "";
                if ($existe['usuario']) $mensaje .= "El nombre de usuario ya existe. ";
                if ($existe['email']) $mensaje .= "El correo electrónico ya está registrado.";

                // Mostrar el registro con mensaje de error
                require_once($this->config['dir_vistas'].'verRegistro.php');
                $vista = new NuevoRegistro($this->config, $mensaje);
                $vista->mostrarRegistro();
                return;
            }

            // Guardar si no existe
            $id = $usuario->guardar();
            $mensaje = "El alta del usuario ($id) se realizó correctamente";
            $this->verInicioSesion($mensaje);

        } catch(Throwable $exception) {
            header('HTTP/2 500 Internal Server Error');
            if($this->config['debug']){
                echo 'Error en controladorLogin: ' .$exception;
            }
            die();
        }
    }




    public function verInicioSesion(){
        require_once($this->config['dir_vistas']).'veriniciosesion.php';
        $vista = new InicioSesion($this->config);
        $vista->mostrariniciosesion();

    }

    public function listar(){
        require_once($this->config['dir_modelos'].'autor.php');
        $autores = Autor::listar();
        // echo '<pre>';
        // var_dump($autores);
        require_once($this->config['dir_vistas'].'autorListar.php');
        $vista = new AutorListar($this->config, $autores);
        $vista->mostrar();
    }
}
?>