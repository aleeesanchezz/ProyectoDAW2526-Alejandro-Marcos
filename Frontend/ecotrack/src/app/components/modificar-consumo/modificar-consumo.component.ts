import { Component, OnDestroy, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Categoria } from 'src/app/entidades/categoria';
import { Consumo } from 'src/app/entidades/consumo';
import { Unidad } from 'src/app/entidades/unidad';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ConsumoService } from 'src/app/services/consumo.service';

@Component({
  selector: 'app-modificar-consumo',
  templateUrl: './modificar-consumo.component.html',
  styleUrls: ['./modificar-consumo.component.css']
})
export class ModificarConsumoComponent implements OnInit, OnDestroy{

  id: any = null;
  categoria: string = '';
  cantidad: number = 0;
  unidad: string = '';
  fecha: string = '';
  co2: number = 0;
  notas: string = '';

  unidadCorrecta: boolean = false;
  mensaje: string = '';
  error: string = '';

  consumoActual: Consumo | null = null;
  fechaInvalida: boolean = false;


  constructor(private router: Router, private authService: AuthServiceService, private consumoService: ConsumoService){}

  usuarioActual = this.authService.getUsuario();


  ngOnInit(): void {
    if(!this.usuarioActual){
      this.authService.redirigirLogin();
    }

    const consumoGuardado = localStorage.getItem('consumoActual');

    if(consumoGuardado){
      this.consumoActual = JSON.parse(consumoGuardado);
      console.log(this.consumoActual);

    } else{
      this.router.navigate(['historial-consumo']);
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem('consumoActual');
  }

  controlarCantidad(){
      if(this.cantidad <= 0){
        this.cantidad = 0;
      }
    }
  
    validarUnidad(): boolean {
  
      if ((this.categoria === Categoria.AGUA || this.categoria === Categoria.GAS) && this.unidad === Unidad.M3) {
          this.unidadCorrecta = true;
      } else if (this.categoria === Categoria.ELECTRICIDAD && this.unidad === Unidad.KWH) {
          this.unidadCorrecta = true;
      } else {
          this.unidadCorrecta = false;
      }
  
      return this.unidadCorrecta;
    }

    calcularCo2(){

    let factorCo2: number = 0;

    switch(this.categoria){
      case Categoria.AGUA:
        factorCo2 = 0.344;
        break;
      case Categoria.ELECTRICIDAD:
        factorCo2 = 0.233;
        break;
      case Categoria.GAS:
        factorCo2 = 0.344;
        break;
    }

    let co2: number = this.cantidad * factorCo2;  

    
    let co2Redondeado = Number(co2.toFixed(2));
    console.log('CO2 generado: ' + co2Redondeado);
    return co2Redondeado;
  }

  modificarConsumo(){

    if (!this.consumoActual) {
      console.error('No hay consumo para modificar');
      return;
    }

    this.co2 = this.calcularCo2();

    let consumoModificado = new Consumo(
      this.consumoActual.id,
      this.consumoActual.usuarioId,
      this.categoria as Categoria,
      this.cantidad,
      this.unidad as Unidad,
      this.fecha,
      this.co2,
      this.notas
    )

    this.consumoService.modificarConsumo(consumoModificado).subscribe({
      next: (res) => {
        console.log(consumoModificado);
        this.mensaje = 'Consumo modificado correctamente, nuevo CO2 Generado', this.co2;
        localStorage.removeItem('consumoActual');
      },
      error: (err) => {
        console.log(err.error?.message);
        this.error = 'Error al modificar el consumo';
      }
    });
  }

    comprobarFecha(){

    const fechaActual: Date = new Date();
    if(this.fecha > fechaActual.toISOString().split('T')[0]){
      this.fecha = fechaActual.toISOString().split('T')[0];
      this.fechaInvalida = true;
    }
  }

  limpiar(){
    this.categoria = '';
    this.cantidad = 0;
    this.unidad = '';
    this.fecha = '';
    this.notas = '';
  }

}
