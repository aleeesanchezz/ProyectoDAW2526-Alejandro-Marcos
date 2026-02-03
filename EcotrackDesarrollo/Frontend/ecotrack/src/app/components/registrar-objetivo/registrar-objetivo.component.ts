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
  fechaFin: string = '';
  estado: Estado = Estado.EN_PROGRESO;
  descripcion: string = '';

  anios: number[] = [];
  anio!: number;
  mes!: number;


  mensaje: string = '';
  error: string = '';

  fechaInvalida: boolean = false;

  ngOnInit(): void {
    if(!this.usuarioActual){
      this.authService.redirigirLogin();
    }

    const anioActual = new Date().getFullYear();

    for (let i = 0; i <= 10; i++) {
      this.anios.push(anioActual - i);
    }
  }

  usuarioActual = this.authService.getUsuario();


  registrarObjetivo(){

    const usuarioActual = this.authService.getUsuario();

    if(!usuarioActual){
      alert('Debes loguearte primero');
      return;
    }

    const fechaInicio = `${this.anio}-${String(this.mes).padStart(2, '0')}-01`;


      let objetivoReduccion = new ObjetivoReduccion(
      this.id,
      usuarioActual.id,
      this.meta_co2,
      fechaInicio,
      this.fechaFin,
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
        this.error = "Ya has registrado un objetivo este mes";
      }
    })

    

  }

    limpiar(){
    this.meta_co2 = 0;
    this.fechaInicio = '';
    this.descripcion = '';
  }

}
