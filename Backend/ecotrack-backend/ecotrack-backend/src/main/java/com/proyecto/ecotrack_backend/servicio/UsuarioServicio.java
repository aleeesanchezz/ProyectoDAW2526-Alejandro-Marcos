package com.proyecto.ecotrack_backend.servicio;

import com.proyecto.ecotrack_backend.modelos.PasswordResetToken;
import com.proyecto.ecotrack_backend.modelos.Usuario;

import java.util.List;

public interface UsuarioServicio {

    /**
     *
     * @return una lista cpn todos los usuarios de la bbdd
     */
    public List<Usuario> obtenerUsuarios();

    /**
     *
     * @param usuario, se le pasas el objeto usuario a insertar
     * @return
     */
    public Usuario guardarUsuario(Usuario usuario);

    /**
     *
     * @param id, se le pasa un id para obtener al usuario
     * @return al usuario correspondiente
     */
    public Usuario obtenerPorId(int id);

    /**
     *
     * @param id, se le pasa un id para eliminar al usuario correspondiente
     */
    public void eliminarUsuarioPorId(int id);

    /**
     *
     * @param email, se le pasa un email para obtener al usuario
     * @return al usuario correspondiente
     */
    public Usuario obtenerPorEmail(String email);

    /**
     *
     * @param usuario, se le pasa al usuario ya con los datos actualizados, el metodo solo sustituye
     * @return
     */
    public Usuario actualizarUsuario(Usuario usuario);

    /**
     *
     * @param email, se le pasa un email a comprobar
     * @param password, se le pasa una contraseña a comprobar
     * @return al usuario autenticado correctamente
     */
    public Usuario login(String email, String password);

    public void guardarToken(PasswordResetToken passwordResetToken);
}
