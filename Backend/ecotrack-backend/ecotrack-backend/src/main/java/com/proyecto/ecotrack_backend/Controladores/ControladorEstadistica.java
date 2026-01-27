package com.proyecto.ecotrack_backend.Controladores;

import com.proyecto.ecotrack_backend.servicio.EstadisticaServicioImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/estadisticas")
public class ControladorEstadistica {

    private final EstadisticaServicioImpl estadisticaServicio;


    public ControladorEstadistica(EstadisticaServicioImpl estadisticaServicio) {
        this.estadisticaServicio = estadisticaServicio;
    }

    @GetMapping("/{id}")
    public double ObtenerTotalCo2MesActual(@PathVariable Integer id){
        return estadisticaServicio.obtenerTotalCo2Mes(id);
    }
}
