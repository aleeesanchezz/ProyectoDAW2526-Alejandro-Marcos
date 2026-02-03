import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estado } from 'src/app/entidades/Estado';
import { ObjetivoReduccion } from 'src/app/entidades/ObjetivoReduccion';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ObjetivoReduccionService } from 'src/app/services/objetivo-reduccion.service';

@Component({
  selector: 'app-lista-objetivos',
  templateUrl: './lista-objetivos.component.html',
  styleUrls: ['./lista-objetivos.component.css']
})
export class ListaObjetivosComponent implements OnInit {

  usuarioActual = this.authService.getUsuario();
  objetivos: ObjetivoReduccion[] = [];
  objetivosOriginales: ObjetivoReduccion[] = [];
  modalEliminar: boolean = false;

  noHayObjetivos: boolean = false;

  // Nombres de meses para formatear bonito
  private nombresMes = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  constructor(
    private authService: AuthServiceService,
    private objetivoService: ObjetivoReduccionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.usuarioActual) {
      this.authService.redirigirLogin();
      return;
    }

    this.obtenerObjetivos();

  }

  obtenerObjetivos(): void {

    const idUsuarioActual = this.usuarioActual?.id;

    if (!idUsuarioActual) {
      return;
    }

    this.objetivoService.obtenerObjetivos(idUsuarioActual).subscribe({
      next: (res) => {
        this.objetivos = res;

        if(res.length === 0){
          this.noHayObjetivos = true;
        }

        // Procesar cada objetivo para sacar mes y año
        this.objetivos.forEach(obj => {
          if (obj.fechaInicio) {
            obj.fechaOriginal = obj.fechaInicio; // Guardar fecha original para ordenamiento
            const [anio, mes] = obj.fechaInicio.split('-');
            const nombreMes = this.nombresMes[Number(mes) - 1];
            obj.fechaInicio = `${nombreMes} ${anio}`;   
          }
        });
        this.objetivosOriginales = [...this.objetivos];

        console.log(this.objetivos);
      },
      error: (err) => {
        console.error('Error al obtener objetivos', err);
      }
    });
  }

  buscar($termino: any): void {
    const termino = $termino.value.trim();
    console.log(termino);
    if(termino.length === 0){
      this.objetivos = [...this.objetivosOriginales];
    }
    else{
      this.objetivos = this.objetivosOriginales.filter(obj => 
        obj.fechaInicio.toLowerCase().includes(termino.toLowerCase()) ||
        obj.meta_co2.toString().toLowerCase().includes(termino.toLowerCase()) ||
        this.obtenerEstado(obj.estado).toLowerCase().includes(termino.toLowerCase()) ||
        (obj.descripcion && obj.descripcion.toLowerCase().includes(termino.toLowerCase()))
      );
    }
  }

  ordenarReciente(): void {
    this.objetivos.sort((a, b) => {
      const fechaA = new Date(a.fechaOriginal || a.fechaInicio);
      const fechaB = new Date(b.fechaOriginal || b.fechaInicio);
      return fechaB.getTime() - fechaA.getTime();
    });
  }

  ordenarAntiguo(): void {
    this.objetivos.sort((a, b) => {
      const fechaA = new Date(a.fechaOriginal || a.fechaInicio);
      const fechaB = new Date(b.fechaOriginal || b.fechaInicio);
      return fechaA.getTime() - fechaB.getTime();
    });
  }

  registrarObjetivo(): void {
    const usuarioActual = this.authService.getUsuario();

    if (!usuarioActual) {
      this.router.navigate(['usuarios/registrar']);
    } else {
      this.router.navigate(['registrar-objetivo']);
    }
  }

  obtenerColorEstado(estado: Estado): string {
    switch (estado) {
      case Estado.COMPLETADO:
        return 'green';
      case Estado.EN_PROGRESO:
        return 'yellow';
      case Estado.FALLIDO:
        return 'red';
      default:
        return 'gray';
    }
  }

  obtenerEstado(estado: Estado): string {
    switch (estado) {
      case Estado.COMPLETADO:
        return 'Completado';
      case Estado.EN_PROGRESO:
        return 'En progreso';
      case Estado.FALLIDO:
        return 'Fallido';
      default:
        return 'Desconocido';
    }
  }

  mostrarModalEliminar(id: any): void {
    this.modalEliminar = true;
    localStorage.setItem('idObjetivo', JSON.stringify(id));
  }

  cerrarModal(): void {
    this.modalEliminar = false;
    localStorage.removeItem('idObjetivo');
  }

  eliminarObjetivo(): void {
    const idObjetivo = localStorage.getItem('idObjetivo');

    if (!idObjetivo) {
      return;
    }

    this.objetivoService.eliminarObjetivo(idObjetivo).subscribe({
      next: () => {
        console.log('Objetivo eliminado');
        this.obtenerObjetivos();
        this.cerrarModal();
      },
      error: (err) => {
        console.error('Error al eliminar objetivo', err);
      }
    });
  }


}
