<?php
    class BD{

        private $conexion;

        public function __construct(){

            try {
                $config = require(__DIR__ . '/../config.php');
                $host = $config['bd_host'];
                $nombre = $config['bd_nombre'];
                $usuario = $config['bd_usuario'];
                $clave = $config['bd_clave'];
                $stringConexion = "mysql:host=$host;dbname=$nombre";
                $this->conexion = new PDO($stringConexion, $usuario, $clave);
                $this->conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (Exception  $exception) {
                 die("Error de conexión BD: " . $exception->getMessage());
            }
        }

        public function insertar($sql, $parametros){

            $sentencia = $this->conexion->prepare($sql);
            $sentencia->execute($parametros);

            return $this->conexion->lastInsertId();
        }

        public function seleccionar($sql, $parametros = null){
            $sentencia = $this->conexion->prepare($sql);
            $sentencia->execute($parametros);
            return $sentencia->fetchAll(PDO::FETCH_ASSOC);
        }
    }
?>