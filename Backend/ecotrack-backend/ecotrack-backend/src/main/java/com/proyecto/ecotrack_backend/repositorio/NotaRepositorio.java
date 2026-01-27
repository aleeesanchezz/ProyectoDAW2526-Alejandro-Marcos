package com.proyecto.ecotrack_backend.repositorio;

import com.proyecto.ecotrack_backend.modelos.Nota;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotaRepositorio extends JpaRepository<Nota, Integer> {

    List<Nota> findByUsuario_id(Integer id);
}
