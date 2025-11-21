<?php
// Clase encargada de manejar todo lo relacionado con el login y el registro
class ControladorLogin {
    private $config;
    
    // Constructor donde guardo la configuración (rutas, debug, etc.)
    public function __construct($config) {
        $this->config = $config;
    }
    
    // (Registro eliminado) — la aplicación solo soporta login y logout ahora.
    
    // Muestra el formulario para iniciar sesión
    public function verInicioSesion(){
        require_once($this->config['dir_vistas'].'veriniciosesion.php');
        $vista = new InicioSesion($this->config);
        $vista->mostrariniciosesion();
    }
    
    // Método que valida los datos introducidos en el login
    public function crearSesion() {
    try {
        // Verificar que lleguen los datos POST
        if (!isset($_POST['nombre']) || !isset($_POST['contraseña'])) {
            // Si no hay datos POST, redirigir al login
            $this->verInicioSesion();
            return;
        }
        
        // Datos enviados desde el formulario de login
        $nombre = $_POST['nombre'];
        $contraseña = $_POST['contraseña'];
        
        require_once($this->config['dir_modelos'].'usuario.php');
        
        // Llamo al método estático que comprueba usuario y contraseña
        $datosUsuario = Usuario::validarLogin($nombre, $contraseña);
        
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
