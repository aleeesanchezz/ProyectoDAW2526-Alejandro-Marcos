<?php
require_once('./servicios/bd.php');

class Usuario {
    private $id;
    private $nombre;
    private $contraseña;
    private $base_datos;

    public function __construct(string $nombre, string $contraseña) {
        $this->id = null;
        $this->nombre = $nombre;
        $this->contraseña = $contraseña;
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
        return $this->nombre;
    }

    // public function guardar() {
    //     try {
    //         // Hashear la contraseña antes de guardar
    //         $contraseñaHash = password_hash($this->contraseña, PASSWORD_DEFAULT);
            
    //             $sql = "INSERT INTO usuario (nombre,clave) 
    //                 VALUES (?, ?)";

    //         $parametros = [
    //             $this->nombre, 
    //             $contraseñaHash
    //         ];
            
    //         $this->id = $this->base_datos->insertar($sql, $parametros);
    //         return $this->id;
            
    //     } catch(Throwable $exception) {
    //         header('HTTP/2 500 Internal Server Error');
    //         echo "Error en modelos/usuario.php: " . $exception;
    //         die();
    //     }
    // }


    /**
     * Método estático para validar login
     * @param string $nombreUsuario
     * @param string $contraseña
     * @return array|false Retorna los datos del usuario si es válido, false si no
     */
    public static function validarLogin(string $nombre, string $contraseña) {
        try {
            $base_datos = new BD();
            
            // Buscar el usuario por nombre 
                $sql = "SELECT id, nombre, clave 
                    FROM usuario 
                    WHERE nombre = ?";
            
            $parametros = [$nombre];
            $resultado = $base_datos->seleccionar($sql, $parametros);
            
            // Si no existe el usuario
            if (empty($resultado)) {
                return false;
            }
            
            $datosUsuario = $resultado[0];
            
            // Verificar la contraseña (hash moderno)
            if (password_verify($contraseña, $datosUsuario['clave'])) {
                // Login exitoso - retornar datos sin la contraseña
                return [
                    'id' => $datosUsuario['id'],
                    'nombre' => $datosUsuario['nombre']
                ];
            }

            // Fallback: si la BD contiene una contraseña en texto plano (migración)
            // se acepta la coincidencia exacta, pero se recomienda rehacer el hashing
            if ($datosUsuario['clave'] === $contraseña) {
                return [
                    'id' => $datosUsuario['id'],
                    'nombre' => $datosUsuario['nombre']
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