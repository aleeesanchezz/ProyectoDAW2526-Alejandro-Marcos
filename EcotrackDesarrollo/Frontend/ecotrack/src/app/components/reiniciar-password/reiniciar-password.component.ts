import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-reiniciar-password',
  templateUrl: './reiniciar-password.component.html',
  styleUrls: ['./reiniciar-password.component.css']
})
export class ReiniciarPasswordComponent implements OnInit{

  

  password: string = '';
  passwordRepetida: string = '';

  error: string = '';
  mensaje: string = '';

  passwordDiferentes: boolean = false;
  token: string = '';

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log('Token: ', this.token);
    })
  }

  comprobarPassword(){
    if(this.password != this.passwordRepetida){
      this.passwordDiferentes = true;
    }

    if(this.password === this.passwordRepetida){
      this.passwordDiferentes = false;
    }
  }

  reiniciarPassword(){
    this.usuarioService.reiniciarContraseña(this.token, this.password).subscribe({
      next: (res) => {
        console.log('Contraseña reiniciada correctamente');
        this.mensaje = 'Contraseña reiniciada correctamente';
      },
      error: (err) => {
        console.log('Error al reiniciar la contraseña ', err);
        this.error = 'Error al reiniciar la contraseña';
      }
    })

  }

  mostrarPassword(password: string){
    const passwordInput = document.getElementById(password) as HTMLInputElement;
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    const toggleIcon = document.getElementById('toggleIcon');
  }

}
