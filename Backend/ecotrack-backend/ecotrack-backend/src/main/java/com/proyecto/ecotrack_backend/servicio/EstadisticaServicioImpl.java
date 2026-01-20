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
    public double obtenerTotalCo2MesActual(Integer idUsuario) {

        LocalDate inicioMes = LocalDate.now().withDayOfMonth(1); // Devuelve el primer dia del mes actual
        LocalDate finMes = LocalDate.now().withDayOfMonth(LocalDate.now().lengthOfMonth()); // Devuelve el último dia del mes actual

        return consumoRepositorio.obtenerTotalCo2PorPeriodo(idUsuario, inicioMes, finMes);
    }
}
