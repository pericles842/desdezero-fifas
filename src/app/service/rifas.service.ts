import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rifa } from '../models/rifa.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RifasService {

  constructor(private http: HttpClient) { }

  /**
   *Se encarga de editar o crear una rifa 
   * @param rifa -si el id es 0  la crea si es > 1 edita el registro
   * @returns Rifa
   */

  createRaffle(rifa: Rifa): Observable<Rifa> {
    return this.http.post<Rifa>(`${environment.host}/rifas`, rifa)
  }
}
