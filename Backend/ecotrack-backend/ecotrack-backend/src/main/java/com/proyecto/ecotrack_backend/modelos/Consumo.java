package com.proyecto.ecotrack_backend.modelos;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity

@Table(name = "consumo")
public class Consumo {

    //atributos

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Clave foránea
    @ManyToOne
    @JoinColumn(
            name = "id_usuario",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_consumo_usuario")
    )

    private Usuario usuario;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Categoria categoria;

    @Column(nullable = false)
    private double cantidad;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Unidad unidad;

    @Column(nullable = false)
    private LocalDate fecha;

    @Column(nullable = false)
    private double co2;

    @Column(nullable = true)
    private String notas;

    public Consumo() {
    }

    public Consumo(Integer id, Usuario usuario, Categoria categoria, double cantidad, Unidad unidad, LocalDate fecha, double co2, String notas) {
        this.id = id;
        this.usuario = usuario;
        this.categoria = categoria;
        this.cantidad = cantidad;
        this.unidad = unidad;
        this.fecha = fecha;
        this.co2 = co2;
        this.notas = notas;
    }

    public Integer getId() {
        return id;
    }


    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario){
        this.usuario = usuario;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public double getCantidad() {
        return cantidad;
    }

    public void setCantidad(double cantidad) {
        this.cantidad = cantidad;
    }

    public Unidad getUnidad() {
        return unidad;
    }

    public void setUnidad(Unidad unidad) {
        this.unidad = unidad;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public double getCo2() {
        return co2;
    }

    public void setCo2(double co2) {
        this.co2 = co2;
    }

    public String getNotas() {
        return notas;
    }

    public void setNotas(String notas) {
        this.notas = notas;
    }
}
