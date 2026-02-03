import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthServiceService } from '../services/auth-service.service';

/**
 * Guard para proteger rutas que requieren autenticación
 * Verifica la sesión activa en el servidor
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    // Verificar si hay sesión activa en el servidor
    return this.authService.verificarSesion().pipe(
      map((isActive: boolean) => {
        if (isActive) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(() => {
        // Si hay error, redirigir a login
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
