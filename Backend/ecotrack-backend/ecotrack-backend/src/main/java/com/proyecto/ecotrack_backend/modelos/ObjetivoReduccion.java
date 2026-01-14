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
            foreignKey = @ForeignKey(name = "fk_consumo_usuario")
    )
    private Usuario usuario;

    @Column(nullable = false)
    private double meta_co2;

    @Column(nullable = false)
    private LocalDate fecha_inicio;

    @Column(nullable = false)
    private LocalDate fecha_fin;

    @Column(nullable = false)
    private boolean completado;

    @Column(nullable = true)
    private String descripcion;

    public ObjetivoReduccion() {
    }



    public ObjetivoReduccion(Integer id, Usuario usuario, double meta_co2, LocalDate fecha_inicio, LocalDate fecha_fin, boolean completado, String descripcion) {
        this.id = id;
        this.usuario = usuario;
        this.meta_co2 = meta_co2;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.completado = completado;
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
