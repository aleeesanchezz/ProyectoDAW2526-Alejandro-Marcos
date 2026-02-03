import { Component, OnInit } from '@angular/core';
import { Consumo } from 'src/app/entidades/consumo';
import { Usuario } from 'src/app/entidades/usuario';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ConsumoService } from 'src/app/services/consumo.service';
import { EstadisticasService } from 'src/app/services/estadisticas.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit{

  constructor(private authService: AuthServiceService, private consumoService: ConsumoService, private estadisticaService: EstadisticasService){}

  usuarioActual = this.authService.getUsuario();
  consumos: Consumo[] = [];
  numeroDeConsumos: number = 0;
  totalCo2GeneradoEsteMes: number = 0;
  totalCo2GeneradoEsteMesRedondeado: any = 0;

  ngOnInit(): void {
    this.consumoService.obtenerListas(this.usuarioActual?.id).subscribe({
      next: (res) => {
        this.consumos = res;
        console.log(this.consumos);
        this.numeroDeConsumos = this.consumos.length;
      }
    });

    if(this.usuarioActual){
      this.estadisticaService.ObtenerTotalCo2MesActual(this.usuarioActual.id).subscribe({
        next: (res) => {
          this.totalCo2GeneradoEsteMes = res;
          this.totalCo2GeneradoEsteMesRedondeado = this.totalCo2GeneradoEsteMes.toFixed(2);
        }
      })
    } 
    

  }



  




  

}
