package com.proyecto.ecotrack_backend.servicio;

public interface EstadisticaServicio {

    /**
     *
     * @param idUsuario el id del usuario que inició sesión
     * @return la suma de todo el co2 que genero en el mes actual
     */
    public double obtenerTotalCo2MesActual(Integer idUsuario);
}
