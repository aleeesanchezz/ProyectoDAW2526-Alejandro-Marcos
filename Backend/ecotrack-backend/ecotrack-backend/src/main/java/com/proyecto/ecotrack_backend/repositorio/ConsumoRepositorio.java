package com.proyecto.ecotrack_backend.repositorio;

import com.proyecto.ecotrack_backend.modelos.Consumo;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ConsumoRepositorio extends JpaRepository<Consumo, Integer> {

    /**
     *
     * @param id, se le pasa el id del usuario
     * @return una lista con todos los consumos registrados por el usuario
     */
    List<Consumo> findByUsuarioId(Integer id);

    @Transactional
    void deleteByUsuarioId(Integer usuarioId);


    //Obtiene la suma de todo el co2 generado en un mes por el usuario
    @Query("""
        SELECT COALESCE(SUM(c.co2), 0)
        FROM Consumo c
        WHERE c.usuario.id = :idUsuario
        AND c.fecha BETWEEN :fechaInicio AND :fechaFin
    """)
    Double obtenerTotalCo2PorPeriodo(
            @Param("idUsuario") Integer idUsuario,
            @Param("fechaInicio") LocalDate fechaInicio,
            @Param("fechaFin") LocalDate fechaFin
    );
}
