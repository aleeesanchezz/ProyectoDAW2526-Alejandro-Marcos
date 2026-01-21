package com.proyecto.ecotrack_backend.servicio;

import com.proyecto.ecotrack_backend.excepciones.EmailExistenteException;
import com.proyecto.ecotrack_backend.excepciones.NombreUsuarioExistenteException;
import com.proyecto.ecotrack_backend.modelos.PasswordResetToken;
import com.proyecto.ecotrack_backend.modelos.Usuario;
import com.proyecto.ecotrack_backend.repositorio.PasswordResetTokenRepository;
import com.proyecto.ecotrack_backend.repositorio.UsuarioRepositorio;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioServicioImpl implements UsuarioServicio{

    private final UsuarioRepositorio usuarioRepo;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordEncoder codificarPassword;
    private final com.proyecto.ecotrack_backend.repositorio.ConsumoRepositorio consumoRepositorio;
    private final com.proyecto.ecotrack_backend.repositorio.ObjetivoReduccionRepositorio objetivoReduccionRepositorio;

    public UsuarioServicioImpl(UsuarioRepositorio usuarioRepo, PasswordResetTokenRepository passwordResetTokenRepository, PasswordEncoder codificarPassword, com.proyecto.ecotrack_backend.repositorio.ConsumoRepositorio consumoRepositorio, com.proyecto.ecotrack_backend.repositorio.ObjetivoReduccionRepositorio objetivoReduccionRepositorio) {
        this.usuarioRepo = usuarioRepo;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.codificarPassword = codificarPassword;
        this.consumoRepositorio = consumoRepositorio;
        this.objetivoReduccionRepositorio = objetivoReduccionRepositorio;
    }

    @Override
    public List<Usuario> obtenerUsuarios() {
        return usuarioRepo.findAll();
    }

    @Override
    public Usuario guardarUsuario(Usuario usuario) {

        if(usuarioRepo.existsByNombreUsuario(usuario.getNombreUsuario())){
            throw new NombreUsuarioExistenteException();
        }

        if(usuarioRepo.existsByEmail(usuario.getEmail())){
            throw new EmailExistenteException();
        }

        String passwordCodificada = codificarPassword.encode(usuario.getPassword());
        usuario.setPassword(passwordCodificada);
        return usuarioRepo.save(usuario);
    }

    @Override
    public Usuario obtenerPorId(int id) {
        return usuarioRepo.findById(id).get();
    }

    @Override
    public void eliminarUsuarioPorId(int id) {
        try {
            // Eliminar objetivos de reducción del usuario
            objetivoReduccionRepositorio.deleteByUsuarioId(id);
            // Eliminar consumos del usuario
            consumoRepositorio.deleteByUsuarioId(id);
            // Eliminar tokens de restablecimiento de contraseña
            passwordResetTokenRepository.deleteByUsuarioId(id);
            // Eliminar usuario
            usuarioRepo.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error al eliminar el usuario: " + e.getMessage(), e);
        }
    }

    @Override
    public Usuario obtenerPorEmail(String email) {
        return usuarioRepo.findByEmail(email);
    }


    @Override
    public Usuario actualizarUsuario(Usuario usuario) {

        if(usuarioRepo.existsByNombreUsuarioAndIdNot(usuario.getNombreUsuario(), usuario.getId())){
            throw new NombreUsuarioExistenteException();
        }

        if(usuarioRepo.existsByEmailAndIdNot(usuario.getEmail(), usuario.getId())){
            throw new EmailExistenteException();
        }
        return usuarioRepo.save(usuario);
    }

    @Override
    public Usuario login(String email, String password) {

        Usuario usuario = obtenerPorEmail(email);
        if(usuario != null && codificarPassword.matches(password, usuario.getPassword())){
            return usuario;
        } else{
            return null;
        }
    }

    @Override
    public void guardarToken(PasswordResetToken passwordResetToken) {
        passwordResetTokenRepository.save(passwordResetToken);
    }


}
