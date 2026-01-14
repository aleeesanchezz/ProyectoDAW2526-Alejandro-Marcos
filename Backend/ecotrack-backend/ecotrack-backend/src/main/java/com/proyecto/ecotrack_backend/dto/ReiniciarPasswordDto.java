package com.proyecto.ecotrack_backend.dto;

public class ReiniciarPasswordDto {

    private String token;
    private String passwordNueva;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getPasswordNueva() {
        return passwordNueva;
    }

    public void setPasswordNueva(String passwordNueva) {
        this.passwordNueva = passwordNueva;
    }
}
