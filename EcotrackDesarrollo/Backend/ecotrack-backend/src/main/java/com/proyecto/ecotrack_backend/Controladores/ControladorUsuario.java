package com.proyecto.ecotrack_backend.Controladores;

import com.proyecto.ecotrack_backend.dto.ReiniciarPasswordDto;
import com.proyecto.ecotrack_backend.excepciones.EmailExistenteException;
import com.proyecto.ecotrack_backend.excepciones.NombreUsuarioExistenteException;
import com.proyecto.ecotrack_backend.modelos.PasswordResetToken;
import com.proyecto.ecotrack_backend.modelos.Usuario;
import com.proyecto.ecotrack_backend.repositorio.PasswordResetTokenRepository;
import com.proyecto.ecotrack_backend.repositorio.UsuarioRepositorio;
import com.proyecto.ecotrack_backend.servicio.EmailService;
import com.proyecto.ecotrack_backend.servicio.UsuarioServicio;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

@RestController //Exponer servicios
@RequestMapping("/api/usuarios") //Identificacion de la API
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true") //CORS con credenciales
public class ControladorUsuario {

    private final UsuarioServicio usuarioServicio;
    private final EmailService emailServicio;
    private final PasswordResetTokenRepository tokenRepository;
    private final PasswordEncoder codificarPassword;
    private final UsuarioRepositorio usuarioRepo;
    
    @Value("${app.frontend-url}")
    private String frontendUrl;

    private static int codigoVerificacion;

    public ControladorUsuario(UsuarioServicio usuarioServicio, EmailService emailServicio, PasswordResetTokenRepository tokenRepository, PasswordEncoder codificarPassword, UsuarioRepositorio usuarioRepo) {

        this.usuarioServicio = usuarioServicio;
        this.emailServicio = emailServicio;
        this.tokenRepository = tokenRepository;
        this.codificarPassword = codificarPassword;
        this.usuarioRepo = usuarioRepo;
    }

    //http://localhost/api/usuarios
    @PostMapping
    public Usuario guardarUsuario(@RequestBody Usuario usuario){ //Convierte los datos a JSON

        return usuarioServicio.guardarUsuario(usuario);
    }

    //http://localhost/api/usuarios
    @GetMapping
    public List<Usuario> obtenerUsuarios(){

        return usuarioServicio.obtenerUsuarios();
    }

    //http://localhost/api/usuarios/id
    @GetMapping("{id}")
    public Usuario obtenerPorId(@PathVariable int id){ //Parsea la variable de la url

        return usuarioServicio.obtenerPorId(id);
    }

    //http://localhost/api/usuarios/id
    @DeleteMapping("{id}")
    public void eliminarUsuario(@PathVariable Integer id){
        usuarioServicio.eliminarUsuarioPorId(id);
    }

    //http://localhost/api/usuarios
    @PutMapping
    public Usuario actualizarUsuario(@RequestBody Usuario usuario){
        Usuario usuarioDB = usuarioServicio.obtenerPorId(usuario.getId());
        usuarioDB.setNombre(usuario.getNombre());
        usuarioDB.setNombreUsuario(usuario.getNombreUsuario());

        return usuarioServicio.actualizarUsuario(usuarioDB);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario, HttpServletRequest request){
        Usuario usuarioLogueado = usuarioServicio.login(usuario.getEmail(), usuario.getPassword());

        if(usuarioLogueado != null){
            // Obtener o crear nueva sesión
            HttpSession session = request.getSession(true);
            
            // Almacenar información del usuario en la sesión
            usuarioLogueado.setPassword(null);
            session.setAttribute("usuarioId", usuarioLogueado.getId());
            session.setAttribute("usuarioEmail", usuarioLogueado.getEmail());
            session.setAttribute("usuarioNombre", usuarioLogueado.getNombre());
            
            // Retornar información del usuario
            Map<String, Object> respuesta = new HashMap<>();
            respuesta.put("usuario", usuarioLogueado);
            respuesta.put("sessionId", session.getId());
            
            return ResponseEntity.ok(respuesta);
        } else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email o contraseña incorrectos");
        }
    }

    @PostMapping("/verificar-email")
    public ResponseEntity<?> mandarCodigoVerificacion(@RequestBody Usuario usuario){

        if(usuarioRepo.existsByNombreUsuario(usuario.getNombreUsuario())){
            throw new NombreUsuarioExistenteException();
        }

        if(usuarioRepo.existsByEmail(usuario.getEmail())){
            throw new EmailExistenteException();
        }

        // Crea el codigo aleatorio de 5 digitos
        int codigo = ThreadLocalRandom.current().nextInt(10000, 100000);

        String enlace = frontendUrl + "/verificar-codigo";

        emailServicio.enviarCorreo(usuario.getEmail(), "Codigo de verificación EcoTrack", "Este es su código de verificación para iniciar" + "\n" +
                "sesión en Ecotrack: " + codigo + ", por favor, acceda al siguiente enlace para continuar con el registro " + enlace);

        codigoVerificacion = codigo;

        return ResponseEntity.ok("Correo enviado");

    }

    @PostMapping("/comprobar-codigo")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> comprobarCodigo(@RequestBody Map<String, Integer> payload){

        Integer codigo = payload.get("codigo");


        if(codigo == codigoVerificacion){
            return ResponseEntity.ok("Verificación correcta");
        } else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Codigo incorrecto");
        }
    }

    @PostMapping("/olvidar-password")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> olvidarPassword(@RequestBody String email){

        Usuario usuario = null;
        try{
            usuario = usuarioServicio.obtenerPorEmail(email);
        } catch(RuntimeException re){
            re.printStackTrace();
        }

        // Genera un token único para el usuario
        String token = UUID.randomUUID().toString();

        // Se crea el objeto y se le pasa el usuario, el token, y el tiempo de expiracion
        PasswordResetToken passwordResetToken = new PasswordResetToken();

        passwordResetToken.setToken(token);
        passwordResetToken.setUsuario(usuario);
        LocalDateTime tiempoDeExpiracion = LocalDateTime.now().plusMinutes(30);
        passwordResetToken.setTiempoExpiracion(tiempoDeExpiracion);

        usuarioServicio.guardarToken(passwordResetToken);

        // Enlace que llevara al reseteo de contraseña
        String enlace = frontendUrl + "/reiniciar-password?token=" + token;

        emailServicio.enviarCorreo(usuario.getEmail(), "Recuperar contraseña", "Pulse aquí para recuperar tu contraseña:\n" + enlace);

        return ResponseEntity.ok("Correo enviado");

    }

    @PostMapping("/reiniciar-password")
    public ResponseEntity<?> resetPassword(@RequestBody ReiniciarPasswordDto reiniciarPassword) {

        PasswordResetToken resetToken = tokenRepository.findByToken(reiniciarPassword.getToken());

        if (resetToken == null) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Token inválido o ya utilizado");
        }

        if (resetToken.getTiempoExpiracion().isBefore(LocalDateTime.now())) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Token expirado");
        }

        Usuario usuario = resetToken.getUsuario();
        usuario.setPassword(codificarPassword.encode(reiniciarPassword.getPasswordNueva()));
        usuarioServicio.actualizarUsuario(usuario);

        tokenRepository.delete(resetToken);

        return ResponseEntity.ok("Contraseña cambiada");
    }

    /**
     * Endpoint para cerrar sesión
     * Invalida la sesión actual del usuario
     */
    @PostMapping("/cerrar-sesion")
    public ResponseEntity<?> cerrarSesion(HttpSession session) {
        if (session != null) {
            session.invalidate();
            return ResponseEntity.ok("Sesión cerrada correctamente");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No hay sesión activa");
    }

    /**
     * Endpoint para verificar si el usuario tiene una sesión activa
     * Retorna la información del usuario en sesión
     */
    @GetMapping("/verificar-sesion")
    public ResponseEntity<?> verificarSesion(HttpSession session) {
        Integer usuarioId = (Integer) session.getAttribute("usuarioId");
        
        if (usuarioId != null) {
            // Buscar el usuario completo en la base de datos
            Usuario usuario = usuarioServicio.obtenerPorId(usuarioId);
            if (usuario != null) {
                usuario.setPassword(null);
                
                Map<String, Object> respuesta = new HashMap<>();
                respuesta.put("usuario", usuario);
                respuesta.put("sesionActiva", true);
                
                return ResponseEntity.ok(respuesta);
            }
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(Map.of("sesionActiva", false, "mensaje", "No hay sesión activa"));
    }



}