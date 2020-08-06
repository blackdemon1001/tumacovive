import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TipoUsuario} from '../modelos/tipo-usuario'
import {UsuarioFindAll} from '../modelos/usuario-find-all'
import {ApiUrl} from '../modelos/ruta-api-ret'
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

/*CONSULTA TABLA TIPO USUARIO */
  findAllTipoUsuario():Promise<TipoUsuario[]>{
    return this.http.get<TipoUsuario[]>(ApiUrl+'tipoUsuario').toPromise();
  }
  /*CONSULTA TABLA USUARIO */
 findAllUsuario():Promise<UsuarioFindAll[]>{
   return this.http.get<UsuarioFindAll[]>(ApiUrl+'usuario').toPromise();
 }

}
