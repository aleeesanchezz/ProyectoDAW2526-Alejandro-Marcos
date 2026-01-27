package com.proyecto.ecotrack_backend.Controladores;

import com.proyecto.ecotrack_backend.dto.ObjetivoReduccionDto;
import com.proyecto.ecotrack_backend.modelos.Estado;
import com.proyecto.ecotrack_backend.modelos.ObjetivoReduccion;
import com.proyecto.ecotrack_backend.servicio.ObjetivoReduccionServicio;
import com.proyecto.ecotrack_backend.servicio.ObjetivoReduccionServicioImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/objetivoReduccion")
public class ControladorObjetivoReduccion {

    private final ObjetivoReduccionServicio objetivoReduccionServicio;

    public ControladorObjetivoReduccion(ObjetivoReduccionServicio objetivoReduccionServicio) {
        this.objetivoReduccionServicio = objetivoReduccionServicio;
    }

    @GetMapping("{id}")
    public List<ObjetivoReduccion> obtenerObjetivos(@PathVariable Integer id){
        objetivoReduccionServicio.comprobarFechaFinalizadaYEstado(id);
        return this.objetivoReduccionServicio.obtenerObjetivos(id);
    }

    @PostMapping
    public ObjetivoReduccion registrarObjetivo(@RequestBody ObjetivoReduccionDto objetivoReduccionDto){
        return objetivoReduccionServicio.guardarObjetivo(objetivoReduccionDto);
    }

    @DeleteMapping("{id}")
    public void eliminarObjetivo(@PathVariable Integer id){
        objetivoReduccionServicio.eliminarPorId(id);
    }
    
}
