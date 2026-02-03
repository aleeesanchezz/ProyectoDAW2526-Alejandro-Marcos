import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


  email: string = '';
  password: string = '';

  mensaje: string = '';
  error: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router, private authService: AuthServiceService){}

  ngOnInit(): void {
    // Solo limpiar localStorage sin hacer llamada al backend
    this.authService.limpiarSesionLocal();
  }

  iniciarSesion(){
    this.usuarioService.validarLogin(this.email, this.password).subscribe({
      next: (res: any) => {
        // La respuesta ahora incluye { usuario, sessionId }
        if(res.usuario) {
          this.authService.setUsuario(res.usuario);
          this.mensaje = 'Inicio de sesion exitoso';
          setTimeout(() => {
            this.router.navigate(['']);
          }, 1000);
        }
      },
      error: (err) => {
        if(err.status === 401){
          this.error = err.error || 'Email o contrase\u00f1a incorrectos';
        } else {
          this.error = 'Error al iniciar sesi\u00f3n. Intente nuevamente.';
        }
      }
    })
  }

  mostrarPassword(){
    const passwordInput = document.getElementById('contraseña') as HTMLInputElement;
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password'; 
    const toggleIcon = document.getElementById('toggleIcon');
  }

}
