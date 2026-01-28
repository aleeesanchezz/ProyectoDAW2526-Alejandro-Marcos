package com.proyecto.ecotrack_backend.modelos;

import jakarta.persistence.*;

//Indica que es una entidad para la base de datos
@Entity

@Table(name = "usuario")
public class Usuario {

    //Atributos

    @Id //Indica que es la clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Indica que la clave primaria se completa automaticamente y de manera incremental
    @Column(columnDefinition = "INT UNSIGNED")
    private Integer id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String apellidos;

    @Column(unique = true, nullable = false, name = "nombre_usuario") //Indica que el atributo debe ser unico y no nulo
    private String nombreUsuario;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    //Constructores

    public Usuario() {
    }

    public Usuario(Integer id, String nombre, String apellidos, String nombreUsuario, String password, String email) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.nombreUsuario = nombreUsuario;
        this.password = password;
        this.email = email;
    }

    //Getters y setters


    public int getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos(){
        return apellidos;
    }

    public void setApellidos(String apellidos){
        this.apellidos = apellidos;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
