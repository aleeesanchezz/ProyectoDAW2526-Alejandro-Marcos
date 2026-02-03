import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  private api: string = `${environment.apiUrl}/estadisticas`;

  constructor(private http: HttpClient) { }


  // Metodo que lanza una peticion GET para obtener la suma de todo el co2 generado por el usuario en el mes actual
  ObtenerTotalCo2MesActual(id: number):Observable<number>{
    return this.http.get<number>(this.api +'/' + id);
  }
}
  