import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nota } from 'src/app/entidades/Nota';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { NotasService } from 'src/app/services/notas.service';

@Component({
  selector: 'app-lista-notas',
  templateUrl: './lista-notas.component.html',
  styleUrls: ['./lista-notas.component.css']
})
export class ListaNotasComponent implements OnInit {

  usuarioActual = this.authService.getUsuario();
  notas: Nota[] = [];
  notasOriginales: Nota[] = [];
  modalEliminar: boolean = false;

  private nombresMes = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  constructor(
    private authService: AuthServiceService,
    private notasService: NotasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.usuarioActual) {
      this.authService.redirigirLogin();
      return;
    }
    this.obtenerNotas();
  }

  obtenerNotas(): void {
    const idUsuarioActual = this.usuarioActual?.id;

    if (!idUsuarioActual) {
      return;
    }

    this.notasService.obtenerNotas(idUsuarioActual).subscribe({
      next: (res) => {
        this.notas = res;

        // Procesar cada nota para sacar mes y año
        this.notas.forEach(nota => {
          if (nota.fecha) {
            nota.fechaOriginal = nota.fecha; // Guardar fecha original para ordenamiento
            const [anio, mes, dia] = nota.fecha.split('-');
            const nombreMes = this.nombresMes[Number(mes) - 1];
            nota.fecha = `${dia} de ${nombreMes} ${anio}`;
          }
        });
        this.notasOriginales = [...this.notas];

        console.log(this.notas);
      },
      error: (err) => {
        console.error('Error al obtener notas', err);
      }
    });
  }

  buscar($termino: any): void {
    const termino = $termino.value.trim();
    console.log(termino);
    if (termino.length === 0) {
      this.notas = [...this.notasOriginales];
    }
    else {
      this.notas = this.notasOriginales.filter(nota =>
        nota.titulo.toLowerCase().includes(termino.toLowerCase()) ||
        nota.contenido.toLowerCase().includes(termino.toLowerCase()) ||
        nota.fecha.toLowerCase().includes(termino.toLowerCase())
      );
    }
  }

  ordenarReciente(): void {
    this.notas.sort((a, b) => {
      const fechaA = new Date(a.fechaOriginal || a.fecha);
      const fechaB = new Date(b.fechaOriginal || b.fecha);
      return fechaB.getTime() - fechaA.getTime();
    });
  }

  ordenarAntiguo(): void {
    this.notas.sort((a, b) => {
      const fechaA = new Date(a.fechaOriginal || a.fecha);
      const fechaB = new Date(b.fechaOriginal || b.fecha);
      return fechaA.getTime() - fechaB.getTime();
    });
  }

  crearNota(): void {
    const usuarioActual = this.authService.getUsuario();

    if (!usuarioActual) {
      this.router.navigate(['usuarios/registrar']);
    } else {
      this.router.navigate(['crear-nota']);
    }
  }

  redirigirModificarNota(nota: Nota): void {
    const usuarioActual = this.authService.getUsuario();

    const idUsuario = usuarioActual?.id;

    if (!idUsuario) {
      return;
    }

    localStorage.setItem('notaActual', JSON.stringify(nota));
    this.router.navigate(['modificar-nota']);
  }

  mostrarModalEliminar(id: any): void {
    this.modalEliminar = true;
    localStorage.setItem('idNota', JSON.stringify(id));
  }

  cerrarModal(): void {
    this.modalEliminar = false;
    localStorage.removeItem('idNota');
  }

  eliminarNota(): void {
    const idNota = localStorage.getItem('idNota');

    if (!idNota) {
      return;
    }

    this.notasService.eliminarNota(idNota).subscribe({
      next: () => {
        console.log('Nota eliminada');
        this.obtenerNotas();
        this.cerrarModal();
      },
      error: (err) => {
        console.error('Error al eliminar nota', err);
      }
    });
  }

}
