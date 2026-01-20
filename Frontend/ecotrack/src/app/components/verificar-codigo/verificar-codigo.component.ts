import { Component } from '@angular/core';
import { Usuario } from 'src/app/entidades/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-verificar-codigo',
  templateUrl: './verificar-codigo.component.html',
  styleUrls: ['./verificar-codigo.component.css']
})
export class VerificarCodigoComponent {

  codigo: number = 0;
  private nuevoUsuario: Usuario | null = null;


  mensaje: string = '';
  error: string = '';

  constructor(private usuarioService: UsuarioService){}

  verificarCodigo(){
    
    this.usuarioService.comprobarCodigo(this.codigo).subscribe({
      next: (res) => {
        this.registrarUsuario();
      }
    })
  }

  registrarUsuario(){
    const usuarioParaRegistrar = localStorage.getItem('usuarioParaRegistrar');
    if(usuarioParaRegistrar){
      const infoUsuario = JSON.parse(usuarioParaRegistrar);
      this.nuevoUsuario = new Usuario(
        infoUsuario.id,
        infoUsuario.nombre,
        infoUsuario.apellidos,
        infoUsuario.nombreUsuario,
        infoUsuario.password,
        infoUsuario.email
      );
      this.usuarioService.registrarUsuario(this.nuevoUsuario).subscribe({
        next: (res) => {
          this.mensaje = 'Codigo verificado, por favor, inicie sesión';
        },
        error: (err) => {
          if(err.status === 401){
          this.error = err.error || 'Codigo incorrecto';
        }
        }
      })
    }
    
  }
}
