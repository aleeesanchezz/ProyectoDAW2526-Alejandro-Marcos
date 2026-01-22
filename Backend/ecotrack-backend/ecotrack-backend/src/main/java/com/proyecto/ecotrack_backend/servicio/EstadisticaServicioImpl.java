package com.proyecto.ecotrack_backend.servicio;

import com.proyecto.ecotrack_backend.repositorio.ConsumoRepositorio;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class EstadisticaServicioImpl implements EstadisticaServicio{

    private final ConsumoRepositorio consumoRepositorio;

    public EstadisticaServicioImpl(ConsumoRepositorio consumoRepositorio) {
        this.consumoRepositorio = consumoRepositorio;
    }

    @Override
    public double obtenerTotalCo2Mes(Integer idUsuario) {

        LocalDate inicioMesAnterior = LocalDate.now()
                .minusMonths(1)
                .withDayOfMonth(1);

        LocalDate finMesAnterior = inicioMesAnterior
                .withDayOfMonth(inicioMesAnterior.lengthOfMonth());

        return consumoRepositorio.obtenerTotalCo2PorPeriodo(idUsuario, inicioMesAnterior, finMesAnterior);
    }
}
