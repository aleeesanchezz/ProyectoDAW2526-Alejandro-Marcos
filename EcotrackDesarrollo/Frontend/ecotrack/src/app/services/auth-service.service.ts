import { Injectable } from '@angular/core';
import { Usuario } from '../entidades/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private usuarioActual: Usuario | null = null;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

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

  cerrarSesion(){
    // Cerrar sesión en el backend
    this.usuarioService.cerrarSesion().subscribe({
      next: () => {
        this.usuarioActual = null;
        localStorage.removeItem('usuario');
        this.redirigirLogin();
      },
      error: (error) => {
        console.error('Error al cerrar sesión:', error);
        // Limpiar de todas formas
        this.usuarioActual = null;
        localStorage.removeItem('usuario');
        this.redirigirLogin();
      }
    });
  }

  // Limpiar sesión local sin llamar al backend
  limpiarSesionLocal(){
    this.usuarioActual = null;
    localStorage.removeItem('usuario');
  }

  // Verificar si hay una sesión activa en el servidor
  verificarSesion(): Observable<boolean> {
    return this.usuarioService.verificarSesion().pipe(
      map((response: any) => {
        if (response.sesionActiva && response.usuario) {
          this.setUsuario(response.usuario);
          return true;
        }
        return false;
      })
    );
  }

  public redirigirLogin(){
    this.router.navigate(['/login']);
  }

  
}
