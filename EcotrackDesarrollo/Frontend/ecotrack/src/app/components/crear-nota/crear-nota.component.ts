import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { NotasService } from 'src/app/services/notas.service';

@Component({
  selector: 'app-crear-nota',
  templateUrl: './crear-nota.component.html',
  styleUrls: ['./crear-nota.component.css']
})
export class CrearNotaComponent implements OnInit{

    usuarioActual = this.authService.getUsuario();

    constructor(private authService: AuthServiceService, private notasService: NotasService, private router: Router) { }

     id: any = null;
     titulo: string = '';
     contenido: string = '';
     fecha: string = '';
     color: string = '#4CAF50';

    mensaje: string = '';


  ngOnInit(): void {
      if(!this.usuarioActual){
      this.authService.redirigirLogin();
    }
  }

  registrarNota(){
    
    const usuarioActual = this.authService.getUsuario();
    const idUsuario = usuarioActual?.id;

    const nuevaNota = {
        id: this.id,
        id_usuario: idUsuario,
        titulo: this.titulo,
        contenido: this.contenido,
        fecha: this.fecha,
        color: this.color
    };

    this.notasService.crearNota(nuevaNota).subscribe({
      next: (res) =>{
        console.log(res);
        this.mensaje = '¡Nota creada con éxito!';
        setTimeout(() => {
          this.router.navigate(['/lista-notas']);
        }, 1500);
      }
    })
  }

}
