import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { PaymentMethods } from 'src/app/interfaces/PaymentMethods';
import { Ticket } from 'src/app/interfaces/Ticket';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrl: './web.component.scss'
})
export class WebComponent {
  @ViewChild('rifas') rifas!: ElementRef;
  @ViewChild('comoFunciona') comoFunciona!: ElementRef;
  @ViewChild('inicio') inicio!: ElementRef;
  @ViewChild('ticket') ticket!: ElementRef;
  @ViewChild('quienesSomos') quienesSomos!: ElementRef;
  @ViewChild('contacto') contacto!: ElementRef;

  esCelular = window.innerWidth < 768;
  loading = true;
  rangeValue = 30;
  price_ticket: number = 10;
  quantity_tickets: number = 1;
  today: Date = new Date()


  selectedFileName: string = '';

  tickets: Ticket[] = [
    {
      id: 'TCK-0013',
      title: 'Automóvil Toyota Corolla 2024',
      name: 'Juan Pérez',
      email: 'juan.perez@example.com',
      date: '2023-02-15',
      phone: 123456789,
      status: 'pendiente'
    },
    {
      id: 'TCK-0021',
      title: 'Automóvil Toyota Corolla 2024',
      name: 'María Rodríguez',
      email: 'maria.rodriguez@example.com',
      date: '2023-02-10',
      phone: 987654321,
      status: 'aprobado'
    },
    {
      id: 'TCK-0034',
      title: 'Automóvil Toyota Corolla 2024',
      name: 'Carlos López',
      email: 'carlos.lopez@example.com',
      date: '2023-02-12',
      phone: 555123456,
      status: 'pendiente'
    },
    {
      id: 'TCK-0025',
      title: 'Automóvil Toyota Corolla 2024',
      name: 'María Rodríguez',
      email: 'maria.rodriguez@example.com',
      date: '2023-02-10',
      phone: 987654321,
      status: 'aprobado'
    },
    {
      id: 'TCK-0022',
      title: 'Automóvil Toyota Corolla 2024',
      name: 'María Rodríguez',
      email: 'maria.rodriguez@example.com',
      date: '2023-02-10',
      phone: 987654321,
      status: 'aprobado'
    },
    {
      id: 'TCK-0026',
      title: 'Automóvil Toyota Corolla 2024',
      name: 'María Rodríguez',
      email: 'maria.rodriguez@example.com',
      date: '2023-02-10',
      phone: 987654321,
      status: 'aprobado'
    }
  ];

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
      url: "zinli.png",
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
      url: "zelle.png",
      active: false,
      details: {
        description: "Datos para zelle",
        bank: "Venezuela (0102)",
        holder: "Andres belandria",
        account: "3253711435",
        phone: "+58 412-9844334"
      }

    },
    {
      id: 4,
      name: "Transferencia",
      url: "pago-movil.png",
      active: false,
      details: {
        description: "Datos para Transferencia",
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
      comoFunciona: this.comoFunciona,
      inicio: this.inicio,
      ticket: this.ticket,
      quienesSomos: this.quienesSomos,
      contacto: this.contacto,

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
