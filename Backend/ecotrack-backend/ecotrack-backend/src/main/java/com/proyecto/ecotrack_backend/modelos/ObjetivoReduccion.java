package com.proyecto.ecotrack_backend.modelos;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "objetivo_reduccion")
public class ObjetivoReduccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(
            name = "id_usuario",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_objetivo_usuario")
    )
    private Usuario usuario;

    @Column(nullable = false)
    private double meta_co2;

    @Column(nullable = false)
    private LocalDate fechaInicio;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Estado estado;

    @Column(nullable = true)
    private String descripcion;

    public ObjetivoReduccion() {
    }



    public ObjetivoReduccion(Integer id, Usuario usuario, double meta_co2, LocalDate fechaInicio, Estado estado, String descripcion) {
        this.id = id;
        this.usuario = usuario;
        this.meta_co2 = meta_co2;
        this.fechaInicio = fechaInicio;

        this.estado = estado;
        this.descripcion = descripcion;
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

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
