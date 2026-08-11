import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { PayMethod } from '../models/pay_method';
import { DollarOficial, Payment, Sales } from '../interfaces/PaymentMethods';
import { User } from '../models/user.model';
import { TasasDesdezero } from '../interfaces/RatesDesdezero';
import { MockDbService } from '../mock/mock-db.service';
import { fileToDataUrl } from '../mock/file-to-data-url';
import { SocketService } from './socket.service';

const DEMO_DELAY = 250;

@Injectable({
  providedIn: 'root'
})
export class PayService {

  constructor(
    private db: MockDbService,
    private socketService: SocketService
  ) { }

  createPayMethod(formData: any): Observable<PayMethod> {
    const fd = formData as FormData;
    const pay: PayMethod = JSON.parse(fd.get('pay') as string);
    const file = fd.get('image') as File | null;

    const img$ = file && file.size > 0 ? fileToDataUrl(file) : of(pay.url_img);

    return img$.pipe(
      delay(DEMO_DELAY),
      map((url_img) => this.db.upsertPayMethod({ ...pay, url_img }))
    );
  }

  listPayMethod(): Observable<PayMethod[]> {
    return of(this.db.listPayMethods()).pipe(delay(DEMO_DELAY));
  }

  deletePayMethod(id: number): Observable<any> {
    this.db.deletePayMethod(id);
    return of(true).pipe(delay(DEMO_DELAY));
  }

  //!deprecar
  getRateDollar() {
    return of([] as DollarOficial[]).pipe(delay(DEMO_DELAY));
  }

  getRatesDesdezero() {
    return of(this.db.listTasas()).pipe(delay(DEMO_DELAY));
  }

  createPayForUser(formData: any) {
    const fd = formData as FormData;
    const user: User = JSON.parse(fd.get('pay') as string);
    const file = fd.get('image') as File | null;

    const img$ = file && file.size > 0 ? fileToDataUrl(file) : of('');

    return img$.pipe(
      delay(DEMO_DELAY),
      map((comprobante) => {
        const activa = this.db.getActiveRifa();
        const tikes = this.db.reserveTicketNumbers(user.cantidad_tickets);

        const sale = this.db.addSale({
          id_rifa: activa?.id ?? 0,
          id_metodo_pago: user.detalle_metodo_pago?.id ?? 0,
          nombre: user.nombre,
          telefono: user.telefono,
          correo: user.correo,
          referencia: user.referencia,
          comprobante,
          cantidad_tickets: user.cantidad_tickets,
          estatus: 'pendiente',
          total: user.total,
          total_bs: user.total_bs,
          metodo_pago: user.detalle_metodo_pago?.nombre ?? '',
          tipo: user.detalle_metodo_pago?.tipo ?? 'pagomovil',
          fecha: new Date().toISOString(),
          tasa: user.tasa,
          rifa: activa?.nombre ?? '',
          tikes: tikes.join(','),
        });

        const payment: Payment = {
          id: sale.id,
          total: sale.total,
          total_bs: sale.total_bs,
          tasa: sale.tasa,
          comprobante: sale.comprobante,
          status: sale.estatus,
          cantidad_tickets: sale.cantidad_tickets,
          id_usuario: sale.id,
          id_metodo_pago: sale.id_metodo_pago,
          id_rifa: sale.id_rifa,
          fecha: sale.fecha,
          correo: sale.correo,
          referencia: sale.referencia,
          nombre: sale.nombre,
          telefono: sale.telefono,
        };

        return payment;
      })
    );
  }

  ticketSales(): Observable<Sales[]> {
    const sales = this.db.listSales().map((s) => new Sales({
      id: s.id,
      usuario: s.nombre,
      telefono: s.telefono,
      correo: s.correo,
      referencia: s.referencia,
      comprobante: s.comprobante,
      cantidad_tickets: s.cantidad_tickets,
      estatus: s.estatus,
      total: s.total,
      total_bs: s.total_bs,
      metodo_pago: s.metodo_pago,
      tipo: s.tipo,
      fecha: s.fecha,
      tasa: s.tasa,
      rifa: s.rifa,
      tikes: s.tikes,
    }));

    return of(sales).pipe(delay(DEMO_DELAY));
  }

  private notifyEmailSent(correo: string) {
    setTimeout(() => {
      this.socketService.emit('notificationEmail', {
        res: { error: false, message: {} },
        email: correo,
        severity: 'success',
      });
    }, 900);
  }

  private toSales(s: { id: number; nombre: string; telefono: string; correo: string; referencia: string; comprobante: string; cantidad_tickets: number; estatus: 'aprobado' | 'pendiente' | 'rechazado'; total: number; total_bs: number; metodo_pago: string; tipo: any; fecha: string; tasa: string; rifa: string; tikes: string }): Sales {
    return new Sales({
      id: s.id,
      usuario: s.nombre,
      telefono: s.telefono,
      correo: s.correo,
      referencia: s.referencia,
      comprobante: s.comprobante,
      cantidad_tickets: s.cantidad_tickets,
      estatus: s.estatus,
      total: s.total,
      total_bs: s.total_bs,
      metodo_pago: s.metodo_pago,
      tipo: s.tipo,
      fecha: s.fecha,
      tasa: s.tasa,
      rifa: s.rifa,
      tikes: s.tikes,
    });
  }

  validatePay(id: number): Observable<{ sale: Sales, email: any }> {
    const record = this.db.updateSaleStatus(id, 'aprobado');
    return of(record).pipe(
      delay(DEMO_DELAY),
      map((s) => {
        const sale = this.toSales(s!);
        this.notifyEmailSent(sale.correo);
        return { sale, email: { sent: true } };
      })
    );
  }

  rejectPay(id: number): Observable<{ sale: Sales, email: any }> {
    const record = this.db.updateSaleStatus(id, 'rechazado');
    return of(record).pipe(
      delay(DEMO_DELAY),
      map((s) => {
        const sale = this.toSales(s!);
        this.notifyEmailSent(sale.correo);
        return { sale, email: { sent: true } };
      })
    );
  }

  sendEmail(correo: string, subject: string, text: string, id_payment: number) {
    return of({
      emails: [correo],
      error: '',
      message: 'Correo enviado (demo)',
    }).pipe(delay(DEMO_DELAY));
  }
}
