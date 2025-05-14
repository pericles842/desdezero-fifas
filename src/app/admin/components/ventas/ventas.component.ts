import { Component, HostListener } from '@angular/core';
import { Sales } from 'src/app/interfaces/PaymentMethods';
import { PayService } from 'src/app/service/pay.service';
import { ToastService } from 'src/app/service/toast.service';
import { environment } from 'src/environments/environment';
import { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent {
  esCelular: boolean = false
  loading: boolean = false
  tikesArray!: string[] | number[]
  sales: Sales[] = []
  host: string = environment.host
  visible: boolean = false

  sale: Sales = new Sales()
  columnas: any[] = [
    { key: 'usuario', label: 'Nombre', activa: true, id: 'usuario' },
    { key: 'telefono', label: 'Teléfono', activa: true, id: 'telefono' },
    { key: 'tikes', label: 'Tickets', activa: true, id: 'tikes' },
    { key: 'comprobante', label: 'Pago', activa: true, id: 'comprobante' },
    { key: 'estatus', label: 'Estatus', activa: true, id: 'estatus' },
    { key: 'total_bs', label: 'Total (Bs)', activa: true, id: 'total_bs' },
    { key: 'fecha', label: 'Fecha', activa: true, id: 'fecha' },
    { key: 'accion', label: 'Acción', activa: true, id: 'accion' }
  ];

  constructor(
    private toastService: ToastService,
    private payService: PayService
  ) { }
  toggleColumna(col: any): void {
    col.activa = !col.activa;
  }


  ngOnInit() {
    this.loading = true
    this.payService.ticketSales().subscribe({
      next: (sales) => {

        this.sales = sales.map(sale => {
          sale.tikes = sale.tikes
            ? sale.tikes.split(',').map((tike: string) => tike.trim())
            : [];
          return sale;
        });
        this.sales = sales
        this.loading = false
      },
      error: (err) => {
        this.toastService.error('', err)
        this.loading = false
      },
    })
    this.onResize()
  }
  filterGlobal(event: Event, dt: any) {
    const value = (event.target as HTMLInputElement).value;
    dt.filterGlobal(value, 'contains');
  }

  @HostListener('window:resize')
  /**
   * Actualiza la variable esCelular cada vez que se redimensiona la ventana
   * para poder mostrar u ocultar el componente de imagen en el header
   * seg n sea necesario.
   */
  onResize() {
    this.esCelular = window.innerWidth < 768;
  }

  mostrarTickets(tickets: string[] | number[], overlay: any, event: MouseEvent): void {
    this.tikesArray = tickets

    // Muestra el overlay
    overlay.toggle(event);
  }
  mostrarComprobante(sale: Sales, overlay: any, event: MouseEvent): void {
    this.sale = sale
    overlay.toggle(event);
  }

  ver_mas(sale: Sales) {
    this.visible = true
    this.sale = sale
  }

  validatePay(id: number) {
    this.toastService.confirm('Seguro desea validar el pago', '').then((res: SweetAlertResult) => {
      if (res.isConfirmed) {
        this.loading = true
        this.payService.validatePay(id).subscribe({
          next: (sales) => {

            //trasformamos los tikes de string a un arreglo de numeros
            sales.sale.tikes = sales.sale.tikes.split(',').map((t: string) => Number(t))
            const index = this.sales.findIndex(sale => sale.id === id)

            this.sales[index] = sales.sale
            this.toastService.success('Pago validado correctamente', '')

            if (sales.email && sales.email.errno) {
              setTimeout(() => {
                this.toastService.error('', 'No se pudo enviar el correo')
              }, 2000)
            } else {
              setTimeout(() => {
                this.toastService.success('Correo enviado correctamente', '')
              }, 2000)

            }
            this.loading = false
          },
          error: (err) => {
            this.loading = false
            this.toastService.error('', err)
          },
        })
      }
    })
  }
  rejectPayment() {
    console.log('rejectPayment')
  }
  sendEmail() {
    console.log('sendEmail')
  }
  winUser() {
    console.log('winUser')
  }
}
