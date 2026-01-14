import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  usuarioActual = this.authService.getUsuario();

  primeraLetra = this.usuarioActual?.nombreUsuario[0].toUpperCase();

  constructor(private authService: AuthServiceService){}

}
