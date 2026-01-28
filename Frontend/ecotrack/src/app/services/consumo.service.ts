import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consumo } from '../entidades/consumo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsumoService {
  
  private api: string = `${environment.apiUrl}/consumos`;

  constructor(private http: HttpClient) { }

  /**
   * Metodo que lanza una peticion GET con el parametro id para
   * obtener todos los consumos de un usuario segun su id
  */
  obtenerListas(id: any):Observable<Consumo []>{
    return this.http.get<Consumo []>(this.api + '/' +id);
  }

  //Metodo que lanza una peticion POST para guardar un consumo
  guardarConsumo(consumo: Consumo):Observable<Consumo>{
    return this.http.post<Consumo>(this.api, consumo);
  }

  //Metodo que lanza una peticion PUT para modificar un consumo
  modificarConsumo(consumo: Consumo):Observable<Consumo>{
    return this.http.put<Consumo>(this.api, consumo);
  }

  //Metodo que lanza una peticion DELETE para eliminar un consumo
  eliminarConsumo(id: any):Observable<any>{
    return this.http.delete(this.api+'/'+id);
  }

  //Metodo que lanza una peticion GET para obtener el pdf de consumos
  obtenerPdfConsumos(id: any):Observable<Blob>{
    return this.http.get(this.api+'/generar-pdf/'+id, { responseType: 'blob' });
  }
}
