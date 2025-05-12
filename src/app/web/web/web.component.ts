import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { catchError, of } from 'rxjs';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { DollarOficial } from 'src/app/interfaces/PaymentMethods';
import { Ticket } from 'src/app/interfaces/Ticket';
import { Config } from 'src/app/models/config';
import { PayMethod } from 'src/app/models/pay_method';
import { Rifa } from 'src/app/models/rifa.model';
import { PayService } from 'src/app/service/pay.service';
import { RifasService } from 'src/app/service/rifas.service';
import { ToastService } from 'src/app/service/toast.service';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environment';
import { phoneCountryCodes } from './nums';

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
  phoneList: string[] = phoneCountryCodes

  rifa: Rifa = new Rifa;
  host = environment.host
  esCelular = window.innerWidth < 768;
  loading = false;
  rangeValue = 30;
  price_ticket: number = 10;
  quantity_tickets: number = 1;
  today: Date = new Date()
  dollar: DollarOficial = {
    id: 0,
    title: '',
    imgUrl: '',
    price: ''
  };

  selectedFileName: string = '';

  config: Config = new Config()
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
   * @type {PayMethod[]}
   * @memberof WebComponent
   */
  paymentMethods!: PayMethod[]
  paymentMethod!: PayMethod


  constructor(
    private rifasService: RifasService,
    private payService: PayService,
    private toastService: ToastService,
    private userService: UserService
  ) { }

  ngOnInit() {


    // try {
    //   const [fonts, theme, fa] = await Promise.all([
    //     fetch('https://fonts.googleapis.com/css2?family=Cal+Sans&family=Geist:wght@100..900&display=swap'),
    //     fetch('assets/theme/light-theme.css'),
    //     fetch('https://kit.fontawesome.com/da29abc60a.js')
    //   ]);

    //   if (!fonts.ok || !theme.ok || !fa.ok) {
    //     this.loading = false;
    //     throw new Error('❌ Alguno de los recursos no se pudo cargar');
    //   }

    //   this.loading = false;
    //   // Aquí podrías continuar con tu lógica
    // } catch (err) {
    //   this.loading = false;
    //   console.error('Error detectado:', err);
    // }

    //Carga el rolar y la configuración
    this.configDolarDownload()
    //Carga los recurso de la pagina web 

  }

  /**
   * Descarga la configuración actual del sistema y las tasas de
   * cambio del dólar.
   *
   * Si la tasa web da error, se utiliza la tasa personalizada
   * configurada en la base de datos.
   *
   * @returns {void}
   */
  configDolarDownload() {
    this.loading = true
    forkJoin({
      config: this.userService.getConfig(),
      dollarList: this.payService.getRateDollar().pipe(
        catchError((err) => {
          this.toastService.warning('', 'No se pudo cargar las tasas');
          return of([]);
        })
      )
    }).subscribe({
      next: ({ config, dollarList }) => {
        this.config = config[0]

        //!Si la tasa web da error
        if (dollarList.length == 0) {
          let { tasa_banco, tasa_personalizada } = this.config

          this.dollar = {
            id: 1,
            title: tasa_banco,
            imgUrl: '',
            price: tasa_personalizada.toString()
          }
        } else {
          let tasas = { paralelo: 1, bcv: 0, promedio: 3 }

          this.dollar = dollarList[tasas[this.config.tasa_banco]]
        }

        this.loading = false;

        this.resourcesWeb()
      },
      error: (err) => {
        console.error('Error general:', err);
        this.toastService.error('', err);
        this.loading = false;
      }
    });

  }

  /**
   * Realiza una petición para obtener la rifa activa y los métodos de pago
   * disponibles y los asigna a las variables correspondientes.
   *
   * Si la petición falla, muestra un mensaje de error.
   *
   * @returns {void}
   */
  resourcesWeb() {
    this.loading = true
    forkJoin(
      this.rifasService.getActiveRaffle(),
      this.payService.listPayMethod()
    ).subscribe({
      next: ([rifa, payList]) => {

        //proceso para las rifas
        this.rifa = 'id' in rifa ? rifa : new Rifa

        //Proceso para los metodos de pago
        this.paymentMethods = payList
        this.paymentMethod = this.paymentMethods[0]
        this.changeMethodPay(this.paymentMethod)

        this.loading = false
      },
      error: (err) => {
        this.toastService.error('', err)
        this.loading = false
      },
    })
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
    return `linear-gradient(to right, var(--primary-custom-color) 0%,var(--primary-custom-color) ${value}%, #eee ${value}%, #eee 100%)`;
  }

  /**
   *Se encarga de cambiar el metodo de pago y sus referencias 
   *
   * @param {PaymentMethods} method
   * @memberof WebComponent
   */
  changeMethodPay(method: PayMethod) {
    this.paymentMethods.forEach(m => m.active = false)
    method.active = true
    this.paymentMethod = method
    this.quantity_tickets = this.paymentMethod.min_tickets
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

  getDaysCount(isoDate: string | Date): number {
    // Parsear la fecha destino
    const target = typeof isoDate === 'string'
      ? new Date(isoDate)
      : new Date(isoDate.getTime());

    // Fecha de hoy a medianoche local
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // También normalizamos la fecha destino a medianoche local
    target.setHours(0, 0, 0, 0);

    const msPerDay = 1000 * 60 * 60 * 24;
    const diffMs = target.getTime() - today.getTime();

    // Math.ceil para contar días completos hacia adelante,
    // Math.floor si quisieras contar días ya pasados como negativos exactos
    return Math.ceil(diffMs / msPerDay);
  }

  /**
   * Función que toma una key de los métodos de pago y devuelve su correspondiente título
   * en formato string.
   *
   * @param {string} pay Key del método de pago
   * @returns {string} Título del método de pago
   */
  parseKeyPayMethods(pay: any) {
    let titles: any = {
      banco: 'Banco',
      ci: 'Cédula',
      codigo_banco: 'Código del Banco',
      telefono: 'Teléfono',
      type_person: 'Persona',
      cuenta: 'Cuenta',
      nro_cuenta: 'Numero de Cuenta',
      correo: 'Correo'
    }
    return titles[pay]
  }

  returnDollarForBs(tikes: number, monto: number, precio_dolar: string) {
    const tasa = parseFloat(precio_dolar.replace(',', '.'));
    if (!tikes || !monto || isNaN(tasa) || tasa <= 0) return 0;
    return tikes * monto * tasa;
  }

  validateMinTike(tike: any): void {
    const min = this.paymentMethod.min_tickets;


    if (!this.quantity_tickets || this.quantity_tickets < min) {
      this.quantity_tickets = min;

      this.toastService.warning('El tiket no puede ser menor a ' + min);
    }
  }

}
