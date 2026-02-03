package com.proyecto.ecotrack_backend.servicio;

import com.proyecto.ecotrack_backend.dto.NotaDto;
import com.proyecto.ecotrack_backend.modelos.Nota;

import java.util.List;

public interface NotaServicio {

    public List<Nota> obtenerNotas(Integer id);

    public Nota guardarNota(NotaDto notaDto);

    public void eliminarNota(Integer id);

    public Nota actualizarNota(NotaDto notaDto);


}
