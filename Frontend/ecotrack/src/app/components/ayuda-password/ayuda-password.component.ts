import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-ayuda-password',
  templateUrl: './ayuda-password.component.html',
  styleUrls: ['./ayuda-password.component.css']
})
export class AyudaPasswordComponent {


  email: string = '';

  mensaje: string = '';
  error: string = '';

  

  constructor(private usuarioService: UsuarioService, private router: Router){}

  olvidarPassword(){
    this.usuarioService.olvidarContraseña(this.email).subscribe({
      next: (response: any) => {
        console.log(response);
        this.mensaje = 'Mensaje enviado, revise su bandeja de entrada';
      },
      error: (err) => {
        console.log('Error al enviar el correo', err);
        this.error = 'No hay ningún usuario con esa dirección de correo'; 
      }
    })
  }
}
