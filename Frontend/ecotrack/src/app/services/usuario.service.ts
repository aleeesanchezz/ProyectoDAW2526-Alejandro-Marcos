import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../entidades/usuario';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private api: string = `${environment.apiUrl}/usuarios`;
  private rutaLogin = `${environment.apiUrl}/usuarios/login`;

  constructor(private http: HttpClient){}

  //Metodo que lanza una peticion POST para registrar un usuario
  registrarUsuario(usuario: Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(this.api, usuario);
  }

  //Metodo que lanza una peticion POST para verificar el email
  verificarEmail(usuario: Usuario):Observable<string>{
    return this.http.post<string>(this.api + '/verificar-email', usuario, {responseType: 'text' as 'json'});
  }

  //Metodo que lanza una peticion POSt para comprobar si el codigo coincide
  comprobarCodigo(codigo: number):Observable<string>{
    return this.http.post<string>(this.api + '/comprobar-codigo', {codigo}, {responseType: 'text' as 'json'});
  }

  //Metodo que lanza una peticion POST con el email y contraseña del usuario para validar el login
  validarLogin(email: string, password: string):Observable<Usuario>{
    const body = {
      email: email,
      password: password
    }
    return this.http.post<Usuario>(this.rutaLogin, body);
  }

  //Metodo que lanza una peticion PUT con nuevos datos de un usuario para actualizarlo
  actualizarUsuario(usuario: Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(this.api, usuario);
  }

  //Metodo que lanza una peticion DELETE para eliminar un usuario
  eliminarUsuario(id: any):Observable<any>{
    return this.http.delete(this.api+'/'+id, {responseType: 'text'});
  }

  //Metodo que lanza una peticion POST para ver si el email existe
  olvidarContraseña(email: String):Observable<string>{
    return this.http.post<string>(this.api + "/olvidar-password", email, {responseType: 'text' as 'json'}); // Le dice a angular que la respuesta es de tipo texto
  }

  //Metodo que lanza una peticion POST para reiniciar la contraseña
  reiniciarContraseña(token: string, passwordNueva: string):Observable<string>{
    const body = {
      token: token,
      passwordNueva: passwordNueva
    };
    return this.http.post<string>(this.api + '/reiniciar-password', body, {responseType: 'text' as 'json'});
  }

}
