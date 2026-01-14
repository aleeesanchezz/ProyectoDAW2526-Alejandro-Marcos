package com.proyecto.ecotrack_backend.servicio;

import com.proyecto.ecotrack_backend.dto.ConsumoDto;
import com.proyecto.ecotrack_backend.modelos.Consumo;
import com.proyecto.ecotrack_backend.modelos.Usuario;
import com.proyecto.ecotrack_backend.repositorio.ConsumoRepositorio;
import com.proyecto.ecotrack_backend.repositorio.UsuarioRepositorio;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ConsumoServicioImpl implements ConsumoServicio{

    private final ConsumoRepositorio consumoRepo;
    private final UsuarioRepositorio usuarioRepo;

    public ConsumoServicioImpl(ConsumoRepositorio consumoRepo, UsuarioRepositorio usuarioRepo) {
        this.consumoRepo = consumoRepo;
        this.usuarioRepo = usuarioRepo;
    }


    @Override
    public List<Consumo> obtenerConsumosPorUsuario(Integer id) {
        return consumoRepo.findByUsuarioId(id);
    }

    @Override
    public Consumo guardarConsumo(ConsumoDto consumoDTO) {
        // Forma moderna usando orElseThrow
        Usuario usuario = usuarioRepo.findById(consumoDTO.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + consumoDTO.getUsuarioId()));

        // Convertir DTO a Entidad
        Consumo consumo = new Consumo();
        consumo.setUsuario(usuario);
        consumo.setCategoria(consumoDTO.getCategoria());
        consumo.setCantidad(consumoDTO.getCantidad());
        consumo.setUnidad(consumoDTO.getUnidad());
        consumo.setFecha(consumoDTO.getFecha());
        consumo.setCo2(consumoDTO.getCo2());
        consumo.setNotas(consumoDTO.getNotas());

        return consumoRepo.save(consumo);
    }

    @Override
    public Consumo obtenerConsumoPorId(Integer id) {

        return consumoRepo.findById(id).get();
    }

    @Override
    public void eliminarConsumoPorId(Integer id) {

        consumoRepo.deleteById(id);
    }

    @Override
    public Consumo actualizarConsumo(ConsumoDto consumoDto) {
        Consumo consumo = consumoRepo.findById(consumoDto.getId()).get();

        consumo.setCategoria(consumoDto.getCategoria());
        consumo.setCantidad(consumoDto.getCantidad());
        consumo.setUnidad(consumoDto.getUnidad());
        consumo.setFecha(consumoDto.getFecha());
        consumo.setCo2(consumoDto.getCo2());
        consumo.setNotas(consumoDto.getNotas());

        return consumoRepo.save(consumo);
    }
}
