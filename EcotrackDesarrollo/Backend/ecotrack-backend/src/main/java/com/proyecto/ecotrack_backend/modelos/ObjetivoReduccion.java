package com.proyecto.ecotrack_backend.modelos;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "objetivo_reduccion")
public class ObjetivoReduccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT UNSIGNED")
    private Integer id;

    @ManyToOne
    @JoinColumn(
            name = "usuario_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_objetivo_usuario")
    )
    private Usuario usuario;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = true)
    private String descripcion;

    @Column(name = "porcentaje_reduccion", nullable = true)
    private Double porcentajeReduccion;

    @Column(name = "co2_objetivo", nullable = true)
    private Double meta_co2;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin", nullable = true)
    private LocalDate fechaFin;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Estado estado;

    public ObjetivoReduccion() {
    }

    public ObjetivoReduccion(Integer id, Usuario usuario, String nombre, String descripcion, Double porcentajeReduccion, Double meta_co2, LocalDate fechaInicio, LocalDate fechaFin, Estado estado) {
        this.id = id;
        this.usuario = usuario;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.porcentajeReduccion = porcentajeReduccion;
        this.meta_co2 = meta_co2;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.estado = estado;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
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

    public void setFechaInicio(LocalDate fecha_inicio) {
        this.fechaInicio = fecha_inicio;
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
