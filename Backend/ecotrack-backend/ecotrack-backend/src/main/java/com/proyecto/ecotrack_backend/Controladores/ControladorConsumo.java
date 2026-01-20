package com.proyecto.ecotrack_backend.Controladores;

import com.proyecto.ecotrack_backend.dto.ConsumoDto;
import com.proyecto.ecotrack_backend.modelos.Consumo;
import com.proyecto.ecotrack_backend.servicio.ConsumoServicio;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consumos")
@CrossOrigin(origins = "http://localhost:4200")
public class ControladorConsumo {

    private final ConsumoServicio consumoServicio;

    public ControladorConsumo(ConsumoServicio consumoServicio) {
        this.consumoServicio = consumoServicio;
    }

    @GetMapping("{id}")
    public List<Consumo> obtenerConsumos(@PathVariable Integer id){
        return consumoServicio.obtenerConsumosPorUsuario(id);
    }

    @PostMapping
    public Consumo guardarConsumo(@RequestBody ConsumoDto consumoDto){
        return consumoServicio.guardarConsumo(consumoDto);
    }

    @DeleteMapping("{id}")
    public void eliminarConsumo(@PathVariable Integer id){

        consumoServicio.eliminarConsumoPorId(id);
    }

    @PutMapping
    public Consumo actualizarConsumo(@RequestBody ConsumoDto consumoDto){

        return consumoServicio.actualizarConsumo(consumoDto);

    }
}
