import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit{

  id: any = null;
  nombre: string = '';
  apellidos: string = '';
  nombreUsuario: string = '';
  password: string = '';
  email: string = '';

  error: string = '';
  mensaje: string = '';

  

  constructor(private usuarioService: UsuarioService, private router: Router){}

  ngOnInit(): void {  
  }

  esVacio: boolean = this.nombre === '';

  registrarUsuario(){

    let usuario = new Usuario(this.id, this.nombre, this.apellidos, this.nombreUsuario, this.password, this.email);
    
    this.usuarioService.verificarEmail(usuario).subscribe({
      next: (res) => { // Si va bien
        const usuarioParaRegistrar = localStorage.setItem('usuarioParaRegistrar', JSON.stringify(usuario));
        this.mensaje = 'Le hemos enviado un codigode verificación a su correo, por favor, revíselo';
        this.error = '';
      },
      error: (err) => { // Si va mal
        if(err.status === 409){
          this.error = err.error?.message || 'El usuario o email ya existen';
        } else {
          this.error = 'Error inesperado, inténtelo más tarde';
        }

        this.mensaje = '';
         
      }
    })
  }

  limpiar(){
    this.nombre = '';
    this.apellidos = '';
    this.nombreUsuario = '';
    this.password = '';
    this.email = '';
  }
}
