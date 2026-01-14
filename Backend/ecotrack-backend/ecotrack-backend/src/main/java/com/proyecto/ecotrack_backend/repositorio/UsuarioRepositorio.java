package com.proyecto.ecotrack_backend.repositorio;

import com.proyecto.ecotrack_backend.modelos.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepositorio extends JpaRepository<Usuario, Integer> {

    boolean existsByNombreUsuario(String nombreUSuario);

    boolean existsByNombreUsuarioAndIdNot(String nombreUSuario, Integer id);

    boolean existsByEmail(String email);

    boolean existsByEmailAndIdNot(String email, Integer id);

    Usuario findByEmail(String email);
}
