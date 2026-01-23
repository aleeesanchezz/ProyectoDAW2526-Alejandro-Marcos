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
  modalEliminar: boolean = false;

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

        // Procesar cada objetivo para sacar mes y año
        this.objetivos.forEach(obj => {
          if (obj.fechaInicio) {
            const [anio, mes] = obj.fechaInicio.split('-');
            const nombreMes = this.nombresMes[Number(mes) - 1];
            obj.fechaInicio = `${nombreMes} ${anio}`;   
          }
        });

        console.log(this.objetivos);
      },
      error: (err) => {
        console.error('Error al obtener objetivos', err);
      }
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
