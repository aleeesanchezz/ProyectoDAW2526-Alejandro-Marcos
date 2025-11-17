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
    
    // ✅ CORREGIDO
    public function verInicioSesion(){
        require_once($this->config['dir_vistas'].'veriniciosesion.php');
        $vista = new InicioSesion($this->config);
        $vista->mostrariniciosesion();
    }
    
    public function crearSesion() {
        try {
            $nombreUsuario = $_POST['usuario'];
            $contraseña = $_POST['contraseña'];
            
            require_once($this->config['dir_modelos'].'usuario.php');
            
            // Llamar al método estático validarLogin
            $datosUsuario = Usuario::validarLogin($nombreUsuario, $contraseña);
            
            if ($datosUsuario === false) {
                // Login fallido - mostrar error
                $mensaje = "Usuario o contraseña incorrectos";
                require_once($this->config['dir_vistas'].'veriniciosesion.php');
                $vista = new InicioSesion($this->config, $mensaje);
                $vista->mostrariniciosesion();
                return;
            }
            
            // Login exitoso - Crear sesión
            session_start();
            $_SESSION['usuario_id'] = $datosUsuario['id'];
            $_SESSION['usuario_nombre'] = $datosUsuario['nombre'];
            $_SESSION['usuario_nombreUsuario'] = $datosUsuario['nombreUsuario'];
            $_SESSION['usuario_email'] = $datosUsuario['email'];
            
            // ✅ CORREGIDO - Redirigir a la página principal
            require_once($this->config['dir_vistas'].'verindex.php');
            $vista = new VerIndex($this->config);
            $vista->verIndex();
            exit();
            
        } catch(Throwable $exception) {
            header('HTTP/2 500 Internal Server Error');
            if($this->config['debug']) {
                echo 'Error en controladorLogin->crearSesion: ' . $exception;
            }
            die();
        }
    }
    
    public function listar(){
        require_once($this->config['dir_modelos'].'autor.php');
        $autores = Autor::listar();
        
        require_once($this->config['dir_vistas'].'autorListar.php');
        $vista = new AutorListar($this->config, $autores);
        $vista->mostrar();
    }
}
?>