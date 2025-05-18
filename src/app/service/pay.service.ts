import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PayMethod } from '../models/pay_method';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { DollarOficial, Payment, Sales } from '../interfaces/PaymentMethods';
import { User } from '../models/user.model';

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
  createPayForUser(pay: User) {
    return this.http.post<Payment>(`${environment.host}/pay/create-pay`, pay)
  }
  ticketSales(): Observable<Sales[]> {
    return this.http.get<Sales[]>(`${environment.host}/pay/sales`)
  }
  validatePay(id: number): Observable<{ sale: Sales, email: any }> {
    return this.http.get<{ sale: Sales, email: any }>(`${environment.host}/pay/approve-sale/${id}`)
  }
  rejectPay(id: number): Observable<{ sale: Sales, email: any }> {
    return this.http.get<{ sale: Sales, email: any }>(`${environment.host}/pay/reject-sale/${id}`)
  }

   sendEmail(correo: string, subject: string, text: string) {
    let body = { correo, subject, text }
    return this.http.post<{
        accepted: string[],
        error: string,
        message: string
      }>(`${environment.host}/user/send-email`, body)
  }
}
