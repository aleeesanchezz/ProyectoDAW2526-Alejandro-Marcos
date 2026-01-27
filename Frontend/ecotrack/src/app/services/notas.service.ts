import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

    private api: string = 'http://localhost:8080/api/notas';

  constructor(private http: HttpClient) { }

  obtenerNotas(idUsuario: any){
    return this.http.get<any[]>(`${this.api}/${idUsuario}`);
  }

  crearNota(nota: any){
    return this.http.post<any>(this.api, nota);
  }

  eliminarNota(idNota: any){
    return this.http.delete<any>(`${this.api}/${idNota}`);
  }

  actualizarNota(nota: any){
    return this.http.put<any>(this.api, nota);
  }
}
