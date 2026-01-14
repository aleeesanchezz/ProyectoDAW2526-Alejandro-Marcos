package com.proyecto.ecotrack_backend.repositorio;

import com.proyecto.ecotrack_backend.modelos.ObjetivoReduccion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ObjetivoReduccionRepositorio extends JpaRepository<ObjetivoReduccion, Integer> {

    List<ObjetivoReduccion> findByUsuarioId(Integer id);
}
