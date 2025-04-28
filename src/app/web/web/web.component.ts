import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { PaymentMethods } from 'src/app/interfaces/PaymentMethods';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrl: './web.component.scss'
})
export class WebComponent {
  @ViewChild('rifas') rifas!: ElementRef;
  @ViewChild('comoFunciona') comoFunciona!: ElementRef;

  esCelular = window.innerWidth < 768;
  loading = true;
  rangeValue = 30;
  price_ticket: number = 10;
  quantity_tickets: number = 1;


  selectedFileName: string = '';


  /**
   *METODOS de pago
   *
   * @type {PaymentMethods[]}
   * @memberof WebComponent
   */
  paymentMethods: PaymentMethods[] = [
    {
      id: 1,
      name: "Pago movil",
      url: "pago-movil.png",
      active: true,
      details: {
        description: "Datos para Pago Movil",
        bank: "Venezuela (0102)",
        holder: "Andres belandria",
        account: "81531964016t653r916",
        phone: "+58 412-9844334"
      }

    },
    {
      id: 2,
      name: "Zinli",
      url: "pago-movil.png",
      active: false,
      details: {
        description: "Datos para zinli",
        bank: "Zinli",
        holder: "Andres belandria",
        account: "andres@gmail.com",
        phone: "+58 412-9844334"
      }

    },
    {
      id: 3,
      name: "Zelle",
      url: "pago-movil.png",
      active: false,
      details: {
        description: "Datos para zelle",
        bank: "Venezuela (0102)",
        holder: "Andres belandria",
        account: "3253711435",
        phone: "+58 412-9844334"
      }

    }

  ]
  paymentMethod: PaymentMethods | any = {}

  ngOnInit() {
    this.paymentMethod = this.paymentMethods.find(m => m.active)
  }



  irASeccion(seccion: string) {
    const secciones: { [key: string]: ElementRef } = {
      rifas: this.rifas,
      comoFunciona: this.comoFunciona
    };

    const elemento = secciones[seccion];

    if (elemento) {
      elemento.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
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


  getRangeBackground(value: number): string {
    return `linear-gradient(to right, var(--primary-color) 0%,var(--primary-color) ${value}%, #eee ${value}%, #eee 100%)`;
  }

  /**
   *Se encarga de cambiar el metodo de pago y sus referencias 
   *
   * @param {PaymentMethods} method
   * @memberof WebComponent
   */
  changeMethodPay(method: PaymentMethods) {
    this.paymentMethods.forEach(m => m.active = false)
    method.active = true
    this.paymentMethod = method
  }



  /**
   *Se ecantaga de capturar el nombre del archivo en el file y asinarlo a select filename
   *
   * @param {Event} event
   * @memberof WebComponent
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFileName = input.files[0].name;
    } else {
      this.selectedFileName = '';
    }
  }

}
