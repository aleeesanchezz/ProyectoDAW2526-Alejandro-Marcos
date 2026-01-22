import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/entidades/categoria';
import { Consumo } from 'src/app/entidades/consumo';
import { Unidad } from 'src/app/entidades/unidad';
import { Usuario } from 'src/app/entidades/usuario';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ConsumoService } from 'src/app/services/consumo.service';

@Component({
  selector: 'app-historial-consumo',
  templateUrl: './historial-consumo.component.html',
  styleUrls: ['./historial-consumo.component.css']
})
export class HistorialConsumoComponent implements OnInit{

  consumos: Consumo[] = [];

  usuarioActual = this.authService.getUsuario();

  error: string = '';

  modalEliminar: boolean = false;

  constructor(private authService: AuthServiceService, private consumoService: ConsumoService, private router: Router){}

  private nombresMes = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  

  ngOnInit(): void {
    if(!this.usuarioActual){
      this.authService.redirigirLogin();
    }
    this.obtenerConsumos();
  }

  obtenerConsumos(){

    const usuarioActual = this.authService.getUsuario();

    const idUsuario = usuarioActual?.id;

    this.consumoService.obtenerListas(idUsuario).subscribe({
      next: (res) =>{
        this.consumos = res;

        // Procesar cada objetivo para sacar mes y año
        this.consumos.forEach(con => {
          if (con.fecha) {
            const [anio, mes] = con.fecha.split('-');
            const nombreMes = this.nombresMes[Number(mes) - 1];
            con.fecha = `${nombreMes} ${anio}`;   
          }
        });
        console.log(this.consumos);
      }
    })  

  }

  registrarConsumo(){
    const usuarioActual = this.authService.getUsuario();
    if(!usuarioActual){
      this.router.navigate(['usuarios/registrar']);
    } else{
      this.router.navigate(['registrar-consumo']);
    }
  }

  redirigirModificarConsumo(consumo: Consumo){

    const usuarioActual = this.authService.getUsuario();
    

    const idUsuario = usuarioActual?.id;

    if(!idUsuario){
      this.error = 'No hay usuario actual';
      return;
    }


    localStorage.setItem('consumoActual', JSON.stringify(consumo));
    

    this.router.navigate(['modificar-consumo']);
  }

  mostrarModalEliminar(id: any){
    this.modalEliminar = true;
    localStorage.setItem('idConsumo', JSON.stringify(id));
  }

  cerrarModal(){
    this.modalEliminar = false;
  }

  eliminarConsumo(){
    const idGuardado = localStorage.getItem('idConsumo');
    if(idGuardado){
      const idConsumo = JSON.parse(idGuardado);  
      this.consumoService.eliminarConsumo(idConsumo).subscribe({
      next: (res) => {
        console.log('eliminado');
        this.modalEliminar = false;
        this.obtenerConsumos();
      },
      error: (err) => {
        console.log(err.error?.message);
      }
    })
    }
    
    
    
  }

}
