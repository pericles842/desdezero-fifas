import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PayMethod } from '../models/pay_method';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { DollarOficial } from '../interfaces/PaymentMethods';

@Injectable({
  providedIn: 'root'
})
export class PayService {

  constructor(
    private http: HttpClient
  ) { }

  createPayMethod(pay: PayMethod): Observable<PayMethod> {
    return this.http.post<PayMethod>(`${environment.host}/pay/create`, pay)
  }
  listPayMethod(): Observable<PayMethod[]> {
    return this.http.get<PayMethod[]>(`${environment.host}/pay/list`)
  }
  deletePayMethod(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.host}/pay/delete/${id}`)
  }
  getRateDollar() {
    return this.http.get<DollarOficial[]>(`${environment.host}/pay/get-rates`)
  }
}
