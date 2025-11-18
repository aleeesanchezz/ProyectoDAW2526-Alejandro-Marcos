<?php
    // Clase que gestiona todas las operaciones de base de datos
    // Implementa el patrón DAO (Data Access Object) simplificado
    class BD{

        // Atributo privado que almacena la conexión PDO a la base de datos
        private $conexion;

        // Constructor que establece la conexión con MySQL
        public function __construct(){

            try {
                // Cargo el archivo de configuración que contiene credenciales de BD
                // __DIR__ obtiene el directorio actual del archivo bd.php
                // '../config.php' sube un nivel y accede al archivo de configuración
                $config = require(__DIR__ . '/../config.php');
                
                // Extraigo los parámetros de conexión del array de configuración
                $host = $config['bd_host'];           // Servidor (ej: localhost)
                $nombre = $config['bd_nombre'];       // Nombre de la base de datos
                $usuario = $config['bd_usuario'];     // Usuario de MySQL
                $clave = $config['bd_clave'];         // Contraseña de MySQL
                
                // Construyo la cadena de conexión DSN (Data Source Name)
                // Formato: "mysql:host=localhost;dbname=ecotrack"
                $stringConexion = "mysql:host=$host;dbname=$nombre";
                
                // Creo la conexión PDO con los parámetros configurados
                // PDO es más seguro que mysqli y soporta múltiples tipos de BD
                $this->conexion = new PDO($stringConexion, $usuario, $clave);
                
                // Configuro PDO para que lance excepciones en caso de error
                // Esto permite usar try-catch para un manejo robusto de errores
                // ERRMODE_EXCEPTION convierte warnings en excepciones capturables
                $this->conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                
            } catch (Exception  $exception) {
                // Si falla la conexión (credenciales incorrectas, BD no existe, etc)
                // Muestro el mensaje de error y detengo la ejecución
                // En producción esto debería registrarse en un log y mostrar mensaje genérico
                 die("Error de conexión BD: " . $exception->getMessage());
            }
        }

        // Método para ejecutar INSERT en la base de datos
        // Retorna el ID del registro recién insertado
        public function insertar($sql, $parametros){

            // Preparo la sentencia SQL (sin ejecutarla aún)
            // prepare() protege contra inyección SQL al separar la query de los datos
            $sentencia = $this->conexion->prepare($sql);
            
            // Ejecuto la sentencia pasando los parámetros
            // PDO automáticamente escapa los valores y previene SQL injection
            // $parametros es un array asociativo: ['nombre' => 'Juan', 'email' => 'juan@mail.com']
            $sentencia->execute($parametros);

            // Retorno el ID autoincremental del último registro insertado
            // Útil para saber el ID del usuario recién registrado, por ejemplo
            return $this->conexion->lastInsertId();
        }

        // Método para ejecutar consultas SELECT
        // Retorna un array con los resultados
        public function seleccionar($sql, $parametros = null){
            
            // Preparo la sentencia SQL (protección contra inyección SQL)
            $sentencia = $this->conexion->prepare($sql);
            
            // Ejecuto la query con parámetros opcionales
            // Si no hay parámetros ($parametros = null), ejecuta la query tal cual
            // Ejemplo sin parámetros: SELECT * FROM usuarios
            // Ejemplo con parámetros: SELECT * FROM usuarios WHERE id = :id
            $sentencia->execute($parametros);
            
            // Obtengo todos los resultados como array asociativo
            // FETCH_ASSOC retorna cada fila como ['columna' => 'valor']
            // Facilita el acceso: $resultado[0]['nombre'] en lugar de $resultado[0][0]
            return $sentencia->fetchAll(PDO::FETCH_ASSOC);
        }
    }
?>
