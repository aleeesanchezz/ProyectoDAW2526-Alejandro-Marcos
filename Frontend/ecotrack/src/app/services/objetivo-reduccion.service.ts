import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjetivoReduccion } from '../entidades/ObjetivoReduccion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjetivoReduccionService {

  private api = 'http://localhost:8080/api/objetivoReduccion';

  constructor(private httpClient: HttpClient) { }

  //Metodo que lanza una peticion POST para registrar un objetivo de reduccion
  registrarObjetivo(objetivoReduccion: ObjetivoReduccion):Observable<ObjetivoReduccion>{
    return this.httpClient.post<ObjetivoReduccion>(this.api, objetivoReduccion);
  }

  //Metodo que lanza una peticion GET para obtener los objetivos de reducción del usuario
  obtenerObjetivos(id: any):Observable<ObjetivoReduccion[]>{
    return this.httpClient.get<ObjetivoReduccion[]>(this.api + "/" +id);
  }

  //Metodo que lanza una peticion DELETE para borrar un objetivo
  eliminarObjetivo(id: any):Observable<any>{
    return this.httpClient.delete(this.api + '/' + id);
  }

  
}
