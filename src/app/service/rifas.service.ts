import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Awards, Rifa, winUser } from '../models/rifa.model';
import { MockDbService } from '../mock/mock-db.service';
import { fileToDataUrl } from '../mock/file-to-data-url';

const DEMO_DELAY = 250;

@Injectable({
  providedIn: 'root'
})
export class RifasService {

  constructor(private db: MockDbService) { }

  /**
   *Se encarga de editar o crear una rifa
   * @param rifa -si el id es 0  la crea si es > 1 edita el registro
   * @returns Rifa
   */

  createRaffle(formData: any): Observable<Rifa> {
    const fd = formData as FormData;
    const rifa: Rifa = JSON.parse(fd.get('rifa') as string);
    const file = fd.get('image') as File | null;

    const img$ = file && file.size > 0 ? fileToDataUrl(file) : of(rifa.url_img);

    return img$.pipe(
      delay(DEMO_DELAY),
      map((url_img) => this.db.upsertRifa({ ...rifa, url_img }))
    );
  }

  listRaffle(): Observable<Rifa[]> {
    return of(this.db.listRifas()).pipe(delay(DEMO_DELAY));
  }

  /**
   *Activa una rifa en base al id
   *
   * @param {number} id id de larifa
   * @return {*}  {Observable<Rifa>} objeto rifga
   * @memberof RifasService
   */
  activeRaffle(id: number): Observable<Rifa> {
    return of(this.db.setActiveRifa(id) as Rifa).pipe(delay(DEMO_DELAY));
  }

  getActiveRaffle(): Observable<Rifa> {
    const activa = this.db.getActiveRifa();
    return of((activa ?? {}) as Rifa).pipe(delay(DEMO_DELAY));
  }

  deleteRaffle(id: number) {
    this.db.deleteRifa(id);
    return of(true).pipe(delay(DEMO_DELAY));
  }

  searchTikeByEmail(email: string) {
    const tickets = this.db.listSales()
      .filter((s) => s.correo.toLowerCase() === email.toLowerCase().trim())
      .flatMap((s) => (s.tikes ? s.tikes.split(',') : []).map((tike) => ({
        id: s.id,
        nombre: s.nombre,
        telefono: s.telefono,
        correo: s.correo,
        referencia: s.referencia,
        id_metodo_pago: s.id_metodo_pago,
        id_rifa: s.id_rifa,
        total: s.total,
        cantidad_tickets: s.cantidad_tickets,
        total_bs: s.total_bs,
        tasa: s.tasa,
        comprobante: s.comprobante,
        estatus: s.estatus,
        fecha: s.fecha,
        metodo_pago: s.metodo_pago,
        rifa: s.rifa,
        tike: Number(tike),
      })));

    return of(tickets).pipe(delay(DEMO_DELAY));
  }

  desactivateRaffle(id: number): Observable<Rifa> {
    return of(this.db.deactivateRifa(id) as Rifa).pipe(delay(DEMO_DELAY));
  }
  winUser(id: number, nombre: string, telefono: string, tike_ganador: string, nombre_rifa: string) {
    return of(this.db.setWinner(nombre, telefono, tike_ganador, nombre_rifa)).pipe(delay(DEMO_DELAY));
  }

  getWinUser(): Observable<winUser> {
    return of((this.db.getWinner() ?? {}) as winUser).pipe(delay(DEMO_DELAY));
  }

  deleteWin() {
    this.db.deleteWinner();
    return of(true).pipe(delay(DEMO_DELAY));
  }

  createAward(formData: any): Observable<Awards> {
    const fd = formData as FormData;
    const premio: Awards = JSON.parse(fd.get('premio') as string);
    const file = fd.get('image') as File | null;

    const img$ = file && file.size > 0 ? fileToDataUrl(file) : of(premio.url);

    return img$.pipe(
      delay(DEMO_DELAY),
      map((url) => this.db.upsertAward({ ...premio, url, fecha: premio.fecha || new Date().toISOString() }))
    );
  }

  listAwards(): Observable<Awards[]> {
    return of(this.db.listAwards()).pipe(delay(DEMO_DELAY));
  }

  deleteAwards(id: number) {
    this.db.deleteAward(id);
    return of(true).pipe(delay(DEMO_DELAY));
  }

}
