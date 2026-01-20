package com.proyecto.ecotrack_backend.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService{

    @Autowired
    JavaMailSender enviarEmail;

    @Override
    public void enviarCorreo(String destinatario, String asunto, String texto) {

        SimpleMailMessage mensaje = new SimpleMailMessage();

        mensaje.setTo(destinatario);
        mensaje.setSubject(asunto);
        mensaje.setText(texto);

        enviarEmail.send(mensaje);

    }

}
