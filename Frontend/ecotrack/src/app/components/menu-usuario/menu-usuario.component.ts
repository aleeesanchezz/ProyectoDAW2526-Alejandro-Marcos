import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.css']
})
export class MenuUsuarioComponent implements OnInit{

  constructor(private authService: AuthServiceService, private usuarioService: UsuarioService, private router: Router){}

    usuarioActual = this.authService.getUsuario();

  ngOnInit(): void {
     if (this.usuarioActual) {
      this.nombre = this.usuarioActual.nombre;
      this.apellidos = this.usuarioActual.apellidos;
      this.nombreUsuario = this.usuarioActual.nombreUsuario;
      this.email = this.usuarioActual.email;
    } else{
      this.authService.redirigirLogin();
    }
  }




  nombre: string = '';
  apellidos: string = '';
  nombreUsuario: string = '';
  email: string = '';

  mensaje: string = '';
  error: string = '';

  mostrarAlerta: boolean = false;
  mostrarAlertaEliminarUsuario: boolean = false;

  modificarUsuario(){
    if(this.usuarioActual?.nombre === this.nombre &&
      this.usuarioActual.apellidos === this.apellidos &&
      this.usuarioActual.nombreUsuario === this.nombreUsuario &&
      this.usuarioActual.email === this.email
    ){
      this.mostrarAlerta = true;
      return;
    }

     if (!this.usuarioActual) {
      this.error = 'No hay usuario actual';
      return;
    }

    const usuarioActualizado = new Usuario(this.usuarioActual.id,
      this.nombre,
      this.apellidos,
      this.nombreUsuario,
      this.usuarioActual.password,
      this.email);

    this.usuarioService.actualizarUsuario(usuarioActualizado).subscribe({
      next: (res) => {
        this.mensaje = 'Usuario actualizado correctamente';
        this.error = '';
        console.log(usuarioActualizado);
        this.authService.setUsuario(usuarioActualizado);
      },
      error: (err) => { 
        if(err.status === 409){
          this.error = err.error?.message || 'Ese nombre de usuario ya existe';
        } else {
          this.error = 'Error inesperado, inténtelo más tarde';
        }

        this.mensaje = '';
         
      }
    })
  }

  mostrarModalEliminar(){
    this.mostrarAlertaEliminarUsuario = true;
  }

  eliminarUsuario(){

    const idUsuario = this.usuarioActual?.id;

    if (!idUsuario) {
      this.error = 'No se encontró el ID del usuario';
      return;
    }

    this.usuarioService.eliminarUsuario(idUsuario).subscribe({
      next: (res) => {
        console.log('Usuario eliminado correctamente');
        this.mensaje = 'Usuario eliminado correctamente';
        this.cerrarSesion();
      },
      error: (err) => {
        this.error = err.error?.message || 'No se ha podido eliminar al usuario';
        this.mensaje = '';
      }
    })
  }

  cerrarAlerta(){
    this.mostrarAlerta = false
  }

  cerrarAlertaEliminar(){
    this.mostrarAlertaEliminarUsuario = false
  }

  cerrarSesion(){
    this.authService.logout();
    this.router.navigate(['']);
  }

}
