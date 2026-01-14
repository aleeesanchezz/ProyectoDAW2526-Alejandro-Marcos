package com.proyecto.ecotrack_backend.Controladores;

import com.proyecto.ecotrack_backend.dto.ReiniciarPasswordDto;
import com.proyecto.ecotrack_backend.modelos.PasswordResetToken;
import com.proyecto.ecotrack_backend.modelos.Usuario;
import com.proyecto.ecotrack_backend.repositorio.PasswordResetTokenRepository;
import com.proyecto.ecotrack_backend.servicio.EmailService;
import com.proyecto.ecotrack_backend.servicio.UsuarioServicio;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController //Exponer servicios
@RequestMapping("/api/usuarios") //Identificacion de la API
@CrossOrigin(origins = "http://localhost:4200") //CORS
public class ControladorUsuario {

    private final UsuarioServicio usuarioServicio;
    private final EmailService emailServicio;
    private final PasswordResetTokenRepository tokenRepository;
    private final PasswordEncoder codificarPassword;

    public ControladorUsuario(UsuarioServicio usuarioServicio, EmailService emailServicio, PasswordResetTokenRepository tokenRepository, PasswordEncoder codificarPassword) {

        this.usuarioServicio = usuarioServicio;
        this.emailServicio = emailServicio;
        this.tokenRepository = tokenRepository;
        this.codificarPassword = codificarPassword;
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
    public void eliminarUsuario(@PathVariable int id){

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
    public ResponseEntity<?> login(@RequestBody Usuario usuario){
        Usuario usuarioLogueado = usuarioServicio.login(usuario.getEmail(), usuario.getPassword());

        if(usuarioLogueado != null){
            usuarioLogueado.setPassword(null);
            return ResponseEntity.ok(usuarioLogueado);
        } else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email o contraseña incorrectos");
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
        String enlace = "http://localhost:4200/reiniciar-password?token=" + token;

        emailServicio.enviarCorreo(usuario.getEmail(), "Recuperar contraseña",
                "Pulse aquí para recuperar tu contraseña:\n" + enlace);

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



}
