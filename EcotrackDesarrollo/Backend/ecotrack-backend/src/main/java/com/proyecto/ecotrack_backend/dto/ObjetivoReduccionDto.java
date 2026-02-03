package com.proyecto.ecotrack_backend.dto;

import com.proyecto.ecotrack_backend.modelos.Estado;

import java.time.LocalDate;

public class ObjetivoReduccionDto {

    private Integer id;
    private Integer id_usuario;
    private String nombre;
    private String descripcion;
    private Double porcentajeReduccion;
    private double meta_co2;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private Estado estado;

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

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getPorcentajeReduccion() {
        return porcentajeReduccion;
    }

    public void setPorcentajeReduccion(Double porcentajeReduccion) {
        this.porcentajeReduccion = porcentajeReduccion;
    }

    public double getMeta_co2() {
        return meta_co2;
    }

    public void setMeta_co2(double meta_co2) {
        this.meta_co2 = meta_co2;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }
}
