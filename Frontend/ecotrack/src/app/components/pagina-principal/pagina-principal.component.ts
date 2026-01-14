import { Component, OnInit } from '@angular/core';
import { Consumo } from 'src/app/entidades/consumo';
import { Usuario } from 'src/app/entidades/usuario';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ConsumoService } from 'src/app/services/consumo.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit{

  constructor(private authService: AuthServiceService, private consumoService: ConsumoService){}

  usuarioActual = this.authService.getUsuario();
  consumos: Consumo[] = [];
  numeroDeConsumos: number = 0;

  ngOnInit(): void {
    this.consumoService.obtenerListas(this.usuarioActual?.id).subscribe({
      next: (res) => {
        this.consumos = res;
        console.log(this.consumos);
        this.numeroDeConsumos = this.consumos.length;
      }
    })
  }



  




  

}
