import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/entidades/categoria';
import { Consumo } from 'src/app/entidades/consumo';
import { Unidad } from 'src/app/entidades/unidad';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ConsumoService } from 'src/app/services/consumo.service';

@Component({
  selector: 'app-registrar-consumo',
  templateUrl: './registrar-consumo.component.html',
  styleUrls: ['./registrar-consumo.component.css']
})
export class RegistrarConsumoComponent implements OnInit{

  id: any = null;
  categoria: string = '';
  cantidad: number = 0;
  unidad: string = '';
  fecha: string = '';
  co2: number = 0;
  notas: string = '';

  anios: number[] = [];
  anio!: number;
  mes!: number;

  unidadCorrecta: boolean = false;
  mensaje: string = '';

  constructor(private consumoService: ConsumoService, private authService: AuthServiceService){}

  ngOnInit(): void {
    if(!this.usuarioActual){
      this.authService.redirigirLogin();
    }

    const anioActual = new Date().getFullYear();

    for (let i = 0; i <= 5; i++) {
      this.anios.push(anioActual - i);
    }
    
  }

  usuarioActual = this.authService.getUsuario();

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

   registrarConsumo(){
    this.co2 = this.calcularCo2();

    const usuarioActual = this.authService.getUsuario();

    if(!usuarioActual){
      alert('Debes loguearte primero');
      return;
    }

      const fechaInicio = `${this.anio}-${String(this.mes).padStart(2, '0')}-01`;

    let consumo = new Consumo(this.id,
      usuarioActual.id,
      this.categoria as Categoria,
      this.cantidad,
      this.unidad as Unidad,
      fechaInicio,
      this.co2,
      this.notas);

    this.consumoService.guardarConsumo(consumo).subscribe({
      next: (res) => {
        console.log(consumo);
        this.mensaje = 'Consumo registrado correctamente';
      }
    })
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




  limpiar(){
    this.categoria = '';
    this.cantidad = 0;
    this.unidad = '';
    this.fecha = '';
    this.notas = '';
  }

}
