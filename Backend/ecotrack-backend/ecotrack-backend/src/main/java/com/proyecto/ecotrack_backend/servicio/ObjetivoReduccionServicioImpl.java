package com.proyecto.ecotrack_backend.servicio;

import com.proyecto.ecotrack_backend.dto.ObjetivoReduccionDto;
import com.proyecto.ecotrack_backend.modelos.ObjetivoReduccion;
import com.proyecto.ecotrack_backend.modelos.Usuario;
import com.proyecto.ecotrack_backend.repositorio.ObjetivoReduccionRepositorio;
import com.proyecto.ecotrack_backend.repositorio.UsuarioRepositorio;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ObjetivoReduccionServicioImpl implements ObjetivoReduccionServicio{

    private final ObjetivoReduccionRepositorio objetivoRepositorio;
    private final UsuarioRepositorio usuarioRepositorio;

    public ObjetivoReduccionServicioImpl(ObjetivoReduccionRepositorio objetivoRepositorio, UsuarioRepositorio usuarioRepositorio) {
        this.objetivoRepositorio = objetivoRepositorio;
        this.usuarioRepositorio = usuarioRepositorio;
    }

    @Override
    public List<ObjetivoReduccion> obtenerObjetivos(Integer id) {

        return objetivoRepositorio.findByUsuarioId(id);
    }

    @Override
    public ObjetivoReduccion guardarObjetivo(ObjetivoReduccionDto objetivoDto) {
        LocalDate inicioMes = LocalDate.now().withDayOfMonth(1);
        LocalDate finMes = LocalDate.now().withDayOfMonth(LocalDate.now().lengthOfMonth());

        ObjetivoReduccion objetivoExistente = objetivoRepositorio.obtenerObjetivoMesActual(objetivoDto.getId_usuario(),
                inicioMes, finMes);

        if(objetivoExistente != null){
            throw new RuntimeException("Ya existe un objetivo de reduccion para este mes");
        }

        Usuario usuario = usuarioRepositorio.findById(objetivoDto.getId_usuario()).
                orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + objetivoDto.getId_usuario()));

        ObjetivoReduccion objetivo = new ObjetivoReduccion();
        objetivo.setUsuario(usuario);
        objetivo.setMeta_co2(objetivoDto.getMeta_co2());
        objetivo.setFechaInicio(objetivoDto.getFechaInicio());
        objetivo.setEstado(objetivoDto.getEstado());
        objetivo.setDescripcion(objetivoDto.getDescripcion());

        return objetivoRepositorio.save(objetivo);

    }

    @Override
    public void eliminarPorId(Integer id) {
        objetivoRepositorio.deleteById(id);
    }

    @Override
    public ObjetivoReduccion actualizarObjetivo(ObjetivoReduccionDto objetivoDto) {
        ObjetivoReduccion objetivo = objetivoRepositorio.findById(objetivoDto.getId()).get();

        objetivo.setMeta_co2(objetivoDto.getMeta_co2());
        objetivo.setFechaInicio(objetivoDto.getFechaInicio());
        objetivo.setDescripcion(objetivoDto.getDescripcion());

        return objetivoRepositorio.save(objetivo);
    }
}
