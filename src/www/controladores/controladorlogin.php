<?php
// Clase encargada de manejar todo lo relacionado con el login y el registro
class ControladorLogin {
    private $config;
    
    // Constructor donde guardo la configuración (rutas, debug, etc.)
    public function __construct($config) {
        $this->config = $config;
    }
    
    // Método que muestra el formulario de registro
    public function verRegistro(){
        // Cargo la vista de registro
        require_once($this->config['dir_vistas'].'verRegistro.php');

        // Creo la vista y la muestro
        $vista = new NuevoRegistro($this->config);
        $vista->mostrarRegistro();
    }
   
    // Método que procesa el alta de un nuevo usuario
    public function alta() {
        try {
            // Recojo los datos enviados desde el formulario
            $nombre = $_POST['nombre'];
            $nombreusuario = $_POST['nombreUsuario'];
            $contraseña = $_POST['contraseña'];
            $telefono = $_POST['telefono'];
            $email = $_POST['email'];
            
            // Cargo el modelo usuario para poder crearlo
            require_once($this->config['dir_modelos'].'usuario.php');
            $usuario = new Usuario($nombre, $nombreusuario, $contraseña, $telefono, $email);
            
            // Compruebo si el usuario o el correo ya existen en la BD
            $existe = $usuario->existeUsuarioOCorreo();
            if ($existe['usuario'] || $existe['email']) {
                
                // Si ya existe algo, creo un mensaje para avisarlo
                $mensaje = "";
                if ($existe['usuario']) $mensaje .= "El nombre de usuario ya existe. ";
                if ($existe['email']) $mensaje .= "El correo electrónico ya está registrado.";
                
                // Vuelvo a mostrar el registro con el error
                require_once($this->config['dir_vistas'].'verRegistro.php');
                $vista = new NuevoRegistro($this->config, $mensaje);
                $vista->mostrarRegistro();
                return;
            }
            
            // Si no existe, guardo el usuario
            $id = $usuario->guardar();
            $mensaje = "El alta del usuario ($id) se realizó correctamente";
            
            // Muestro la pantalla de inicio de sesión
            $this->verInicioSesion($mensaje);
            
        } catch(Throwable $exception) {
            // Gestión de errores
            header('HTTP/2 500 Internal Server Error');
            if($this->config['debug']){
                echo 'Error en controladorLogin: ' .$exception;
            }
            die();
        }
    }
    
    // Muestra el formulario para iniciar sesión
    public function verInicioSesion(){
        require_once($this->config['dir_vistas'].'veriniciosesion.php');
        $vista = new InicioSesion($this->config);
        $vista->mostrariniciosesion();
    }
    
    // Método que valida los datos introducidos en el login
    public function crearSesion() {
        try {
            // Datos enviados desde el formulario de login
            $nombreUsuario = $_POST['usuario'];
            $contraseña = $_POST['contraseña'];
            
            require_once($this->config['dir_modelos'].'usuario.php');
            
            // Llamo al método estático que comprueba usuario y contraseña
            $datosUsuario = Usuario::validarLogin($nombreUsuario, $contraseña);
            
            // Si devuelve false, es que los datos no coinciden
            if ($datosUsuario === false) {
                $mensaje = "Usuario o contraseña incorrectos";
                require_once($this->config['dir_vistas'].'veriniciosesion.php');
                $vista = new InicioSesion($this->config, $mensaje);
                $vista->mostrariniciosesion();
                return;
            }
            
            // Si el login es correcto, inicio la sesión
            session_start();
            $_SESSION['usuario_id'] = $datosUsuario['id'];
            $_SESSION['usuario_nombre'] = $datosUsuario['nombre'];
            $_SESSION['usuario_nombreUsuario'] = $datosUsuario['nombreUsuario'];
            $_SESSION['usuario_email'] = $datosUsuario['email'];
            
            // Y lo envío al index
            require_once($this->config['dir_vistas'].'verindex.php');
            $vista = new VerIndex($this->config);
            $vista->verIndex();
            exit();
            
        } catch(Throwable $exception) {
            // Gestión de errores si algo sale mal
            header('HTTP/2 500 Internal Server Error');
            if($this->config['debug']) {
                echo 'Error en controladorLogin->crearSesion: ' . $exception;
            }
            die();
        }
    }
    
    // Lista los autores (no está relacionado con login pero está en este controlador)
    public function listar(){
        require_once($this->config['dir_modelos'].'autor.php');
        
        // Obtengo todos los autores
        $autores = Autor::listar();
        
        // Cargo la vista que los muestra
        require_once($this->config['dir_vistas'].'autorListar.php');
        $vista = new AutorListar($this->config, $autores);
        $vista->mostrar();
    }
}
?>
