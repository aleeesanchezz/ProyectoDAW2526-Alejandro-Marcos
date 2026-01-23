import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ConsumoService } from 'src/app/services/consumo.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  usuarioActual = this.authService.getUsuario();

  primeraLetra = this.usuarioActual?.nombreUsuario[0].toUpperCase();

  constructor(private authService: AuthServiceService, private consumoService: ConsumoService){}

  generarPdfConsumos(): void {
    const idUsuario = this.usuarioActual?.id;

    if(idUsuario){
      this.consumoService.obtenerPdfConsumos(idUsuario).subscribe(blob => {
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'consumos.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
        
      })
    }
  }

}
