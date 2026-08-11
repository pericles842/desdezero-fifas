import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/**
 * Bus de eventos local que sustituye la conexión websocket al backend.
 * Mantiene la misma API pública (listen/emit) para que los componentes
 * consumidores no necesiten cambios.
 */
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private bus = new Subject<{ event: string; data: any }>();

  /**
   * Escuchar eventos
   *
   * @param {string} eventName
   * @return {*}  {Observable<any>}
   * @memberof SocketService
   */
  listen(eventName: string): Observable<any> {
    return this.bus.asObservable().pipe(
      filter((e) => e.event === eventName),
      map((e) => e.data)
    );
  }

  /**
   * Emitir eventos
   *
   * @param {string} eventName
   * @param {*} data
   * @memberof SocketService
   */
  emit(eventName: string, data: any) {
    this.bus.next({ event: eventName, data });
  }
}
