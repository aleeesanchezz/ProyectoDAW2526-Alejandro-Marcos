package com.proyecto.ecotrack_backend.servicio;

import com.proyecto.ecotrack_backend.excepciones.EmailExistenteException;
import com.proyecto.ecotrack_backend.excepciones.NombreUsuarioExistenteException;
import com.proyecto.ecotrack_backend.modelos.PasswordResetToken;
import com.proyecto.ecotrack_backend.modelos.Usuario;
import com.proyecto.ecotrack_backend.repositorio.PasswordResetTokenRepository;
import com.proyecto.ecotrack_backend.repositorio.UsuarioRepositorio;
import com.proyecto.ecotrack_backend.seguridad.CodificarPassword;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioServicioImpl implements UsuarioServicio{

    private final UsuarioRepositorio usuarioRepo;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordEncoder codificarPassword;

    public UsuarioServicioImpl(UsuarioRepositorio usuarioRepo, PasswordResetTokenRepository passwordResetTokenRepository, PasswordEncoder codificarPassword) {
        this.usuarioRepo = usuarioRepo;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.codificarPassword = codificarPassword;
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
        usuarioRepo.deleteById(id);
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
