package com.proyecto.ecotrack_backend.repositorio;

import com.proyecto.ecotrack_backend.modelos.Consumo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConsumoRepositorio extends JpaRepository<Consumo, Integer> {

    /**
     *
     * @param id, se le pasa el id del usuario
     * @return una lista con todos los consumos registrados por el usuario
     */
    List<Consumo> findByUsuarioId(Integer id);
}
