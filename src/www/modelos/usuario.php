<?php
require_once('./servicios/bd.php');

class Usuario {
    private $id;
    private $nombre;
    private $nombreUsuario;
    private $contraseña;
    private $telefono;
    private $email;
    private $base_datos;

    public function __construct(string $nombre, string $nombreUsuario, string $contraseña, string $telefono, string $email) {
        $this->id = null;
        $this->nombre = $nombre;
        $this->nombreUsuario = $nombreUsuario;
        $this->contraseña = $contraseña;
        $this->telefono = $telefono;
        $this->email = $email;
        $this->base_datos = new BD();
    }

    public function __toString() {
        return $this->id . '. ' . $this->nombre;
    }

    public function getId(): ?int {
        return $this->id;
    }

    public function getNombre(): string {
        return $this->nombre;
    }

    public function getNombreUsuario(): string {
        return $this->nombreUsuario;
    }

    public function guardar() {
        try {
            // Hashear la contraseña antes de guardar
            $contraseñaHash = password_hash($this->contraseña, PASSWORD_DEFAULT);
            
            $sql = "INSERT INTO usuario (nombre, nombre_usuario, contraseña, telefono, email) 
                    VALUES (?, ?, ?, ?, ?)";
            
            $parametros = [
                $this->nombre, 
                $this->nombreUsuario, 
                $contraseñaHash, 
                $this->telefono, 
                $this->email
            ];
            
            $this->id = $this->base_datos->insertar($sql, $parametros);
            return $this->id;
            
        } catch(Throwable $exception) {
            header('HTTP/2 500 Internal Server Error');
            echo "Error en modelos/usuario.php: " . $exception;
            die();
        }
    }

    public function existeUsuarioOCorreo(): array {
        $sql = "SELECT COUNT(*) as total, 
                    SUM(nombre_usuario = ?) as usuario_existente, 
                    SUM(email = ?) as email_existente 
                FROM usuario";
        $parametros = [$this->nombreUsuario, $this->email];
        $resultado = $this->base_datos->seleccionar($sql, $parametros);
        
        return [
            'usuario' => $resultado[0]['usuario_existente'] > 0,
            'email' => $resultado[0]['email_existente'] > 0
        ];
    }

    /**
     * Método estático para validar login
     * @param string $nombreUsuario
     * @param string $contraseña
     * @return array|false Retorna los datos del usuario si es válido, false si no
     */
    public static function validarLogin(string $nombreUsuario, string $contraseña) {
        try {
            $base_datos = new BD();
            
            // Buscar el usuario por nombre de usuario
            $sql = "SELECT id, nombre, nombre_usuario, contraseña, telefono, email 
                    FROM usuario 
                    WHERE nombre_usuario = ?";
            
            $parametros = [$nombreUsuario];
            $resultado = $base_datos->seleccionar($sql, $parametros);
            
            // Si no existe el usuario
            if (empty($resultado)) {
                return false;
            }
            
            $datosUsuario = $resultado[0];
            
            // Verificar la contraseña
            if (password_verify($contraseña, $datosUsuario['contraseña'])) {
                // Login exitoso - retornar datos sin la contraseña
                return [
                    'id' => $datosUsuario['id'],
                    'nombre' => $datosUsuario['nombre'],
                    'nombreUsuario' => $datosUsuario['nombre_usuario'],
                    'telefono' => $datosUsuario['telefono'],
                    'email' => $datosUsuario['email']
                ];
            }
            
            // Contraseña incorrecta
            return false;
            
        } catch(Throwable $exception) {
            header('HTTP/2 500 Internal Server Error');
            echo "Error al validar login: " . $exception;
            die();
        }
    }
}
?>