package com.proyecto.ecotrack_backend.excepciones;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class NombreUsuarioExistenteException extends RuntimeException{
}
