import { Injectable } from '@angular/core';
import { Usuario } from '../entidades/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private usuarioActual: Usuario | null = null;

  constructor(private router: Router) { }

  setUsuario(usuario: Usuario){
    this.usuarioActual = usuario;
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  getUsuario(): Usuario | null{
    if(!this.usuarioActual){
      const usuarioString = localStorage.getItem('usuario');
      if(usuarioString){
        const info = JSON.parse(usuarioString);
        this.usuarioActual = new Usuario(
          info.id,
          info.nombre,
          info.apellidos,
          info.nombreUsuario,
          info.password,
          info.email
        );
      }
    }
    return this.usuarioActual;
  }

  logout(){
    this.usuarioActual = null;
    localStorage.removeItem('usuario');
  }

  redirigirLogin(){
    this.router.navigate(['']);
  }

  
}
