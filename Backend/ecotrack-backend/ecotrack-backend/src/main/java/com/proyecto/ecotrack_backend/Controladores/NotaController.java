package com.proyecto.ecotrack_backend.Controladores;

import com.proyecto.ecotrack_backend.dto.NotaDto;
import com.proyecto.ecotrack_backend.modelos.Nota;
import com.proyecto.ecotrack_backend.servicio.NotaServicioImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notas")
@CrossOrigin(origins = "http://localhost:4200")
public class NotaController {

    private final NotaServicioImpl notaServicio;


    public NotaController(NotaServicioImpl notaServicio) {
        this.notaServicio = notaServicio;
    }

    @GetMapping("{id}")
    public List<Nota> obtenerNotas(@PathVariable Integer id){
        return notaServicio.obtenerNotas(id);
    }

    @PostMapping
    public Nota guardarNota(@RequestBody NotaDto notaDto){
        return notaServicio.guardarNota(notaDto);
    }

    @DeleteMapping("{id}")
    public void eliminarNota(@PathVariable Integer id){
        notaServicio.eliminarNota(id);
    }

    @PutMapping
    public Nota actualizarNota(NotaDto notaDto){
        return notaServicio.actualizarNota(notaDto);
    }
}
