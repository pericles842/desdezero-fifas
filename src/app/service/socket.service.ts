import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SocketService {


  private socket: Socket;

  constructor() {
    this.socket = io(environment.host);
  }

  /**
   * Escuchar eventos
   *
   * @param {string} eventName
   * @return {*}  {Observable<any>}
   * @memberof SocketService
   */
  listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  /**
   * Emitir eventos
   *
   * @param {string} eventName
   * @param {*} data
   * @memberof SocketService
   */
  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
