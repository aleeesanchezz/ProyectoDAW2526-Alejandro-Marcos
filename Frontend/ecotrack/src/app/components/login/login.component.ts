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
    this.authService.logout();
    
  }




  iniciarSesion(){
    this.usuarioService.validarLogin(this.email, this.password).subscribe({
      next: (res: Usuario) => {
        this.authService.setUsuario(res);
        this.router.navigate(['inicio']);
        console.log("Login exitoso");
      },
      error: (err) => {
        if(err.status === 401){
          this.error = err.error || 'Email o contraseña incorrectos';
        }
      }
    })
  }

}
