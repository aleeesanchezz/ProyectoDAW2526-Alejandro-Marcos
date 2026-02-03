package com.proyecto.ecotrack_backend.servicio;

import com.proyecto.ecotrack_backend.dto.NotaDto;
import com.proyecto.ecotrack_backend.modelos.Nota;
import com.proyecto.ecotrack_backend.modelos.Usuario;
import com.proyecto.ecotrack_backend.repositorio.NotaRepositorio;
import com.proyecto.ecotrack_backend.repositorio.UsuarioRepositorio;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotaServicioImpl implements NotaServicio{

    private final NotaRepositorio notaRepo;
    private final UsuarioRepositorio usuarioRepo;

    public NotaServicioImpl(NotaRepositorio notaRepo, UsuarioRepositorio usuarioRepo) {
        this.notaRepo = notaRepo;
        this.usuarioRepo = usuarioRepo;
    }


    @Override
    public List<Nota> obtenerNotas(Integer id) {
        return notaRepo.findByUsuario_id(id);
    }

    @Override
    public Nota guardarNota(NotaDto notaDto) {
        Usuario usuario = usuarioRepo.findById(notaDto.getId_usuario()).
                orElseThrow(() -> new RuntimeException("Error"));

        Nota nota = new Nota();

        nota.setUsuario(usuario);
        nota.setTitulo(notaDto.getTitulo());
        nota.setContenido(notaDto.getContenido());
        nota.setFecha(notaDto.getFecha());
        nota.setColor(notaDto.getColor());

        return notaRepo.save(nota);

    }

    @Override
    public void eliminarNota(Integer id) {
        notaRepo.deleteById(id);
    }

    @Override
    public Nota actualizarNota(NotaDto notaDto) {
        Nota nota = notaRepo.findById(notaDto.getId()).get();

        nota.setTitulo(notaDto.getTitulo());
        nota.setContenido(notaDto.getContenido());
        nota.setFecha(notaDto.getFecha());
        nota.setColor(notaDto.getColor());

        return notaRepo.save(nota);
    }
}
