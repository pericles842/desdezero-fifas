import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rifa, winUser } from '../models/rifa.model';
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

  createRaffle(_rifa: Rifa): Observable<Rifa> {
    return this.http.post<Rifa>(`${environment.host}/rifa/create`, _rifa)
  }

  listRaffle(): Observable<Rifa[]> {
    return this.http.get<Rifa[]>(`${environment.host}/rifa/list`)
  }

  /**
   *Activa una rifa en base al id
   *
   * @param {number} id id de larifa
   * @return {*}  {Observable<Rifa>} objeto rifga
   * @memberof RifasService
   */
  activeRaffle(id: number): Observable<Rifa> {
    return this.http.get<Rifa>(`${environment.host}/rifa/activate/${id}`)
  }

  getActiveRaffle(): Observable<Rifa> {
    return this.http.get<Rifa>(`${environment.host}/rifa/active`)
  }

  deleteRaffle(id: number) {
    return this.http.delete<any>(`${environment.host}/rifa/delete/${id}`)
  }
  searchTikeByEmail(email: string) {
    return this.http.get<any>(`${environment.host}/rifa/tickets/${email}`)
  }

  desactivateRaffle(id: number): Observable<Rifa> {
    return this.http.get<Rifa>(`${environment.host}/rifa/deactivate/${id}`)
  }
  winUser(id: number, nombre: string, telefono: string, tike_ganador: string, nombre_rifa: string) {
    let body = {
      ganador: { id, nombre, telefono, tike_ganador, nombre_rifa }
    }
    return this.http.post<winUser>(`${environment.host}/rifa/winner/create`, body)
  }

  getWinUser(): Observable<winUser> {
    return this.http.get<any>(`${environment.host}/rifa/winner`)
  }

  deleteWin() {
    return this.http.delete<any>(`${environment.host}/rifa/winner/delete`)
  }
}
