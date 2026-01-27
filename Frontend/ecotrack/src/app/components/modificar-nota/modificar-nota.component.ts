import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nota } from 'src/app/entidades/Nota';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { NotasService } from 'src/app/services/notas.service';

@Component({
  selector: 'app-modificar-nota',
  templateUrl: './modificar-nota.component.html',
  styleUrls: ['./modificar-nota.component.css']
})
export class ModificarNotaComponent implements OnInit {

  usuarioActual = this.authService.getUsuario();
  nota: Nota | null = null;

  id: any = null;
  titulo: string = '';
  contenido: string = '';
  fecha: string = '';
  color: string = '#4CAF50';

  mensaje: string = '';
  error: string = '';

  constructor(private authService: AuthServiceService, private notasService: NotasService, private router: Router) { }

  ngOnInit(): void {
    if (!this.usuarioActual) {
      this.authService.redirigirLogin();
      return;
    }

    const notaGuardada = localStorage.getItem('notaActual');
    if (notaGuardada) {
      this.nota = JSON.parse(notaGuardada);
      this.id = this.nota?.id;
      this.titulo = this.nota?.titulo || '';
      this.contenido = this.nota?.contenido || '';
      this.fecha = this.nota?.fechaOriginal || this.nota?.fecha || '';
      this.color = this.nota?.color || '#4CAF50';
    } else {
      this.error = 'No hay nota para modificar';
      setTimeout(() => {
        this.router.navigate(['/lista-notas']);
      }, 1500);
    }
  }

  actualizarNota(): void {
    const usuarioActual = this.authService.getUsuario();
    const idUsuario = usuarioActual?.id;

    const notaActualizada = {
      id: this.id,
      id_usuario: idUsuario,
      titulo: this.titulo,
      contenido: this.contenido,
      fecha: this.fecha,
      color: this.color
    };

    this.notasService.actualizarNota(notaActualizada).subscribe({
      next: (res) => {
        console.log(res);
        this.mensaje = '¡Nota actualizada con éxito!';
        setTimeout(() => {
          localStorage.removeItem('notaActual');
          this.router.navigate(['/lista-notas']);
        }, 1500);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al actualizar la nota';
      }
    });
  }

  irAlListado(): void {
    localStorage.removeItem('notaActual');
    this.router.navigate(['/lista-notas']);
  }

}
