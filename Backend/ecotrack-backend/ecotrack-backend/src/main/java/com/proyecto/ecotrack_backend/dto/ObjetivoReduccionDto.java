package com.proyecto.ecotrack_backend.dto;

import java.time.LocalDate;

public class ObjetivoReduccionDto {

    private Integer id;
    private Integer id_usuario;
    private double meta_co2;
    private LocalDate fecha_inicio;
    private LocalDate fecha_fin;
    private boolean completado;
    private String descripcion;

    public ObjetivoReduccionDto() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Integer id_usuario) {
        this.id_usuario = id_usuario;
    }

    public double getMeta_co2() {
        return meta_co2;
    }

    public void setMeta_co2(double meta_co2) {
        this.meta_co2 = meta_co2;
    }

    public LocalDate getFecha_inicio() {
        return fecha_inicio;
    }

    public void setFecha_inicio(LocalDate fecha_inicio) {
        this.fecha_inicio = fecha_inicio;
    }

    public LocalDate getFecha_fin() {
        return fecha_fin;
    }

    public void setFecha_fin(LocalDate fecha_fin) {
        this.fecha_fin = fecha_fin;
    }

    public boolean isCompletado() {
        return completado;
    }

    public void setCompletado(boolean completado) {
        this.completado = completado;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
