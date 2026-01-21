import { Component, OnInit } from '@angular/core';
import { Estado } from 'src/app/entidades/Estado';
import { ObjetivoReduccion } from 'src/app/entidades/ObjetivoReduccion';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ObjetivoReduccionService } from 'src/app/services/objetivo-reduccion.service';

@Component({
  selector: 'app-registrar-objetivo',
  templateUrl: './registrar-objetivo.component.html',
  styleUrls: ['./registrar-objetivo.component.css']
})
export class RegistrarObjetivoComponent implements OnInit{

  constructor(private authService: AuthServiceService, private objetivoReduccionService: ObjetivoReduccionService){}

  id: any = null;
  meta_co2: number = 0;
  fechaInicio: string = '';
  estado: Estado = Estado.EN_PROGRESO;
  descripcion: string = '';

  mensaje: string = '';

  fechaInvalida: boolean = false;

  ngOnInit(): void {
    if(!this.usuarioActual){
      this.authService.redirigirLogin();
    }
  }

  usuarioActual = this.authService.getUsuario();

    comprobarFecha(){

    const fechaActual: Date = new Date();
    if(this.fechaInicio < fechaActual.toISOString().split('T')[0]){
      this.fechaInicio = fechaActual.toISOString().split('T')[0];
      this.fechaInvalida = true;
    }

  }

  registrarObjetivo(){

    const usuarioActual = this.authService.getUsuario();

    if(!usuarioActual){
      alert('Debes loguearte primero');
      return;
    }


      let objetivoReduccion = new ObjetivoReduccion(
      this.id,
      usuarioActual.id,
      this.meta_co2,
      this.fechaInicio,
      this.estado,
      this.descripcion
    );

    this.objetivoReduccionService.registrarObjetivo(objetivoReduccion).subscribe({
      next: (res) => {
        console.log(res);
        this.mensaje = "Objetivo registrado correctamente";
      }, 
      error: (err) => {
        console.log(err);
        this.mensaje = "Error al registrar el objetivo";
      }
    })

    

  }

    limpiar(){
    this.meta_co2 = 0;
    this.fechaInicio = '';
    this.descripcion = '';
  }

}
