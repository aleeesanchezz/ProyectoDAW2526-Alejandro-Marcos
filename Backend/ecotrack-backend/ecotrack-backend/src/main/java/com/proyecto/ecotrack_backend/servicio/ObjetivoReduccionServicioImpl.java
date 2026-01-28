package com.proyecto.ecotrack_backend.servicio;

import com.proyecto.ecotrack_backend.dto.ObjetivoReduccionDto;
import com.proyecto.ecotrack_backend.modelos.Estado;
import com.proyecto.ecotrack_backend.modelos.ObjetivoReduccion;
import com.proyecto.ecotrack_backend.modelos.Usuario;
import com.proyecto.ecotrack_backend.repositorio.ConsumoRepositorio;
import com.proyecto.ecotrack_backend.repositorio.ObjetivoReduccionRepositorio;
import com.proyecto.ecotrack_backend.repositorio.UsuarioRepositorio;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ObjetivoReduccionServicioImpl implements ObjetivoReduccionServicio{

    private final ObjetivoReduccionRepositorio objetivoRepositorio;
    private final UsuarioRepositorio usuarioRepositorio;
    private final ConsumoRepositorio consumoRepositorio;


    public ObjetivoReduccionServicioImpl(ObjetivoReduccionRepositorio objetivoRepositorio, UsuarioRepositorio usuarioRepositorio, ConsumoRepositorio consumoRepositorio) {
        this.objetivoRepositorio = objetivoRepositorio;
        this.usuarioRepositorio = usuarioRepositorio;
        this.consumoRepositorio = consumoRepositorio;
    }

    @Override
    public List<ObjetivoReduccion> obtenerObjetivos(Integer id) {

        return objetivoRepositorio.findByUsuarioId(id);
    }

    @Override
    public ObjetivoReduccion guardarObjetivo(ObjetivoReduccionDto objetivoDto) {

        LocalDate fechaInicioObjetivo = objetivoDto.getFechaInicio();
        LocalDate fechaFinObjetivo = fechaInicioObjetivo.withDayOfMonth(fechaInicioObjetivo.lengthOfMonth());

        LocalDate inicioMes = LocalDate.now().withDayOfMonth(1);
        LocalDate finMes = LocalDate.now().withDayOfMonth(LocalDate.now().lengthOfMonth());



        ObjetivoReduccion objetivoExistente = objetivoRepositorio.obtenerObjetivoMesActual(objetivoDto.getId_usuario(),
                fechaInicioObjetivo, fechaFinObjetivo);

        if(objetivoExistente != null){
            throw new RuntimeException("Ya existe un objetivo de reduccion para este mes");
        }

        Usuario usuario = usuarioRepositorio.findById(objetivoDto.getId_usuario()).
                orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + objetivoDto.getId_usuario()));

        ObjetivoReduccion objetivo = new ObjetivoReduccion();
        objetivo.setUsuario(usuario);
        objetivo.setNombre(usuario.getNombreUsuario());
        objetivo.setDescripcion(objetivoDto.getDescripcion());
        objetivo.setPorcentajeReduccion(objetivoDto.getPorcentajeReduccion());
        objetivo.setMeta_co2(objetivoDto.getMeta_co2());
        objetivo.setFechaInicio(objetivoDto.getFechaInicio());
        objetivo.setFechaFin(fechaFinObjetivo);
        objetivo.setEstado(objetivoDto.getEstado());

        return objetivoRepositorio.save(objetivo);

    }

    @Override
    public void eliminarPorId(Integer id) {
        objetivoRepositorio.deleteById(id);
    }

    @Override
    public Estado comprobarFechaFinalizadaYEstado(Integer id) {
        List<ObjetivoReduccion> objetivos = objetivoRepositorio.findByUsuarioId(id);

        LocalDate fechaActual = LocalDate.now();

        boolean fechaFinalizada = false;

        Estado ultimoEstado = null;

        for(ObjetivoReduccion objetivo : objetivos){
            LocalDate fechaFinObjetivo = objetivo.getFechaFin();

            if(fechaFinObjetivo.isBefore(fechaActual) || fechaFinObjetivo.equals(fechaActual)){
                cambiarEstadoFinal(objetivo, id);
                objetivoRepositorio.save(objetivo);
                ultimoEstado = objetivo.getEstado();

            }

        }


        return ultimoEstado;
    }

    @Override
    public void cambiarEstadoFinal(ObjetivoReduccion objetivoReduccion, Integer id) {

        Double meta_co2 = objetivoReduccion.getMeta_co2();
        Double sumaCo2Mes = consumoRepositorio.obtenerTotalCo2PorPeriodo(id, objetivoReduccion.getFechaInicio(), objetivoReduccion.getFechaFin());

        if(sumaCo2Mes == 0){
            objetivoReduccion.setEstado(Estado.EN_PROGRESO);
        } else if(sumaCo2Mes >= meta_co2){
            objetivoReduccion.setEstado(Estado.FALLIDO);
        } else if(sumaCo2Mes < meta_co2){
            objetivoReduccion.setEstado(Estado.COMPLETADO);
        }
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
