package com.proyecto.ecotrack_backend.repositorio;

import com.proyecto.ecotrack_backend.modelos.ObjetivoReduccion;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ObjetivoReduccionRepositorio extends JpaRepository<ObjetivoReduccion, Integer> {

    List<ObjetivoReduccion> findByUsuarioId(Integer id);

    @Transactional
    void deleteByUsuarioId(Integer usuarioId);

    //Obtiene si hay algun objetivo de reduccion este mes
    @Query(""" 
            SELECT o FROM ObjetivoReduccion o
            WHERE o.usuario.id = :idUsuario
            AND o.fechaInicio BETWEEN :fechaInicio AND :fechaFin
            
            """)
    ObjetivoReduccion obtenerObjetivoMesActual(
            @Param("idUsuario") Integer idUsuario,
            @Param("fechaInicio")LocalDate fechaInicio,
            @Param("fechaFin") LocalDate fechaFin
            );
}
