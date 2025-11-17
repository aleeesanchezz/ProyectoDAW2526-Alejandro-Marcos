<?php
     require_once('./servicios/bd.php');
    class Usuario{

        private $id;
        private $nombre;
        private $nombreUsuario;
        private $contraseña;
        private $telefono;
        private $email;
        private $base_datos;

        public static function listar(){
            $base_datos = new BD();
            $sql = 'SELECT autor.id, autor.nombre, autor.fecha_nacimiento, autor.fecha_muerte, autor.nacionalidad ';
            $sql .= 'FROM autor ';
            $sql .= 'ORDER BY autor.nombre ASC ';
            $tuplas = $base_datos->seleccionar($sql);
            $autores = [];
            foreach($tuplas as $tupla){
                $autor = new Autor($tupla['nombre'], $tupla['fecha_nacimiento'], $tupla['fecha_muerte'], $tupla['nacionalidad']);
                $autor->id = 
                array_push($autores, $autor);
            }

            return $autores;
            
        }

        public function __construct(string $nombre, string  $nombreUsuario, string $contraseña, string $telefono, string $email){
            $this->id = null;
            $this->nombre = $nombre;
            $this->nombreUsuario = $nombreUsuario;
            $this->contraseña = $contraseña;
            $this->telefono = $telefono;
            $this->email = $email;
            $this->base_datos = new BD();
        }

        public function __toString(){
            return $this->id . '. ' . $this->nombre . ' (' . $this->nacionalidad . ')';
        }

        public function getId(): int{
            return $this->id;
        }


        public function guardar(){
            try{

                
                $sql = "INSERT INTO usuario (nombre, nombre_usuario, contraseña, telefono, email) VALUES (?, ?, ?, ?, ?)";
                
                $parametros = [
                    $this->nombre, $this->nombreUsuario, $this->contraseña, $this->telefono, $this->email
                ];

                $this->id = $this->base_datos->insertar($sql, $parametros);
                return $this->id;
                
                die("Hemos insertado con el id: " . $this->id);

            }catch(Throwable $exception){
                header('HTTP/2 500 Internal Server Error');
                echo "Error en modelos/autor.php: " .$exception;
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


        
    }
?>