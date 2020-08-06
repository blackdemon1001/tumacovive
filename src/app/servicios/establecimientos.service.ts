import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {ApiUrl} from '../modelos/ruta-api-ret'
import { promise } from 'protractor';
import { TipoEstablecimiento } from '../modelos/tipo-establecimiento';
import { Establecimientos } from '../modelos/establecimientos';

@Injectable({
  providedIn: 'root'
})
export class EstablecimientosService {

  constructor(private http:HttpClient) { }

  /*CONSULTA TABLA TIPO  */
  findAllTipoEstablecimiento():Promise<TipoEstablecimiento[]>{
    return this.http.get<TipoEstablecimiento[]>(ApiUrl+'tipoEstablecimiento').toPromise();
  }
   /*CONSULTA TABLA USUARIO */
 findAllEstablecimientos():Promise<Establecimientos[]>{
  return this.http.get<Establecimientos[]>(ApiUrl+'establecimiento').toPromise();
}

}
