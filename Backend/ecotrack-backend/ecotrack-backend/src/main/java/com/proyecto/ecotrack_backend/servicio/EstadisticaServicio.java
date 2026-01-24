package com.proyecto.ecotrack_backend.servicio;

import java.util.Map;

public interface EstadisticaServicio {

    /**
     *
     * @param idUsuario el idUsuario del usuario que inició sesión
     * @return la suma de todo el co2 que genero en el mes actual
     */
    public double obtenerTotalCo2Mes(Integer idUsuario);

}
