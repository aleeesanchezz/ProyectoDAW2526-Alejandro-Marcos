package com.proyecto.ecotrack_backend.servicio;

import com.proyecto.ecotrack_backend.dto.ConsumoDto;
import com.proyecto.ecotrack_backend.modelos.Consumo;

import java.util.List;

public interface ConsumoServicio {


    public List<Consumo> obtenerConsumosPorUsuario(Integer id);

    /**
     *
     * @param consumoDto, se le pasa el objeto consumoDto a insertar
     * @return el mismo objeto que se ha insertado
     */
    public Consumo guardarConsumo(ConsumoDto consumoDto);

    /**
     *
     * @param id, se le pasa un id de algun consumo
     * @return el consumo correspondiente
     */
    public Consumo obtenerConsumoPorId(Integer id);

    /**
     *
     * @param id, se le pasa un id de algun consumo
     */
    public void eliminarConsumoPorId(Integer id);

    /**
     *
     * @param consumoDto, se le pasará el consumo ya con los datos actualizados, el metodo solo sustituye
     * @return el consumo ya actualizado
     */
    public Consumo actualizarConsumo(ConsumoDto consumoDto);

    public byte[] generarPdf(Integer id);

    public String generarHtml(List<Consumo> consumos);


}
