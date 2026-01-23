package com.proyecto.ecotrack_backend.servicio;

import com.proyecto.ecotrack_backend.dto.ObjetivoReduccionDto;
import com.proyecto.ecotrack_backend.modelos.Estado;
import com.proyecto.ecotrack_backend.modelos.ObjetivoReduccion;

import java.util.List;

public interface ObjetivoReduccionServicio {

    /**
     * @param id de usuario
     * @return una lista con todos los objetivos de reduccion del usuario
     */
    public List<ObjetivoReduccion> obtenerObjetivos(Integer id);

    /**
     *
     * @param objetivoDto a guardar
     * @return el mismo objetivo que se ha guardado
     */
    public ObjetivoReduccion guardarObjetivo(ObjetivoReduccionDto objetivoDto);


    /**
     *
     * @param id de un objetivo
     */
    public void eliminarPorId(Integer id);

    public boolean comprobarFechaFinalizada(Integer id);

    public ObjetivoReduccion actualizarObjetivo(ObjetivoReduccionDto objetivoDto);

    public void cambiarEstadoFinal(ObjetivoReduccion objetivoReduccion);


}
