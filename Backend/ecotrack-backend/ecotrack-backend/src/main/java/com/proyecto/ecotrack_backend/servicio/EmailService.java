package com.proyecto.ecotrack_backend.servicio;

public interface EmailService {
    void enviarCorreo(String destinatario, String asunto, String texto);
}
