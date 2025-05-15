import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { catchError, of } from 'rxjs';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { DollarOficial } from 'src/app/interfaces/PaymentMethods';
import { Ticket } from 'src/app/interfaces/Ticket';
import { Config, ConfigResponse, TypeDolar } from 'src/app/models/config';
import { PayMethod } from 'src/app/models/pay_method';
import { Rifa } from 'src/app/models/rifa.model';
import { PayService } from 'src/app/service/pay.service';
import { RifasService } from 'src/app/service/rifas.service';
import { ToastService } from 'src/app/service/toast.service';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environment';
import { phoneCountryCodes } from './nums';
import { User } from 'src/app/models/user.model';
import { SweetAlertResult } from 'sweetalert2';
import { contract } from './terminos';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrl: './web.component.scss'
})
export class WebComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('rifas') rifas!: ElementRef;
  @ViewChild('comoFunciona') comoFunciona!: ElementRef;
  @ViewChild('inicio') inicio!: ElementRef;
  @ViewChild('ticket') ticket!: ElementRef;
  @ViewChild('quienesSomos') quienesSomos!: ElementRef;
  @ViewChild('contacto') contacto!: ElementRef;
  phoneList: string[] = phoneCountryCodes
  loading = false;
  host = environment.host
  esCelular = window.innerWidth < 768;
  rangeValue = 30;
  contract: string = contract

  emailSearch: string = ''
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  user: User = new User()

  rifa: Rifa = new Rifa;
  today: Date = new Date()
  dollar: DollarOficial = {
    id: 0,
    title: '',
    imgUrl: '',
    price: ''
  };


  config: ConfigResponse = new ConfigResponse()
  tickets: Ticket[] = []

  /**
   *METODOS de pago
   *
   * @type {PayMethod[]}
   * @memberof WebComponent
   */
  paymentMethods!: PayMethod[]
  paymentMethod: PayMethod = new PayMethod()


  constructor(
    private rifasService: RifasService,
    private payService: PayService,
    private toastService: ToastService,
    private userService: UserService
  ) { }

  ngOnInit() {

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

        this.config = config

        //!Si la tasa web da error
        if (dollarList.length == 0) {
          let { tasa_banco, tasa_personalizada } = this.config.config as Config

          this.dollar = {
            id: 1,
            title: tasa_banco,
            imgUrl: '',
            price: tasa_personalizada.toString()
          }
        } else {
          let tasas = { paralelo: 1, bcv: 0, promedio: 3 }

          if (this.config && Array.isArray(this.config.config) === false) {
            const key = this.config.config.tasa_banco as keyof typeof tasas;
            const index = tasas[key];
            this.dollar = dollarList[index];
          }
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
        //!VALIDA LOS METODOS DE PAGO PORQUE DA ERROR SI NO HAY NADA
        if (payList.length != 0) {
          this.paymentMethods = payList
          this.paymentMethod = this.paymentMethods[0]
          this.changeMethodPay(this.paymentMethod)
        }


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
    //this.user.cantidad_tickets = this.paymentMethod.min_tickets
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
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
    } else {
      this.selectedFile = null;
      this.selectedFileName = null;
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


    if (!this.user.cantidad_tickets || this.user.cantidad_tickets < min) {
      this.user.cantidad_tickets = min;

      this.toastService.warning('El tiket no puede ser menor a ' + min);
    }
  }

  validePhone() {
    if (this.user.telefono !== this.user.confirm_telefono) {
      this.toastService.warning('', 'El numero de teléfono no coincide')
      this.user.confirm_telefono = ''
    }
  }

  /**
   * Realiza una petición para comprar los tickets de una rifa.
   * Antes de hacer la petición, se muestra un mensaje de confirmación
   * con los términos y condiciones de la rifa.
   * Si se confirma, se crea el pago y se env an las instrucciones
   * al usuario por medio de un mensaje de confirmación.
   * Si la petición falla, se muestra un mensaje de error.
   *
   * @returns {void}
   */
  saleTicket() {

    if (!this.valideFormPay()) return
    //terminos u condiciones
    this.toastService.confirm('Términos y condiciones', this.contract).then((res: SweetAlertResult) => {
      if (res.isConfirmed) {
        this.loading = true

        //extraemos inforamcion de apgos y tasa
        this.user.total = this.user.cantidad_tickets * this.rifa.precio
        this.user.total_bs = this.returnDollarForBs(this.user.cantidad_tickets, this.rifa.precio, this.dollar.price)
        this.user.tasa = this.dollar.price
        this.user.detalle_metodo_pago = this.paymentMethod

        //agregamos el form data
        const formData = new FormData();
        if (this.selectedFile) {
          formData.append('image', this.selectedFile);
        }
        formData.append('pay', JSON.stringify(this.user))

        //ejecutamos el servicio
        this.payService.createPayForUser(formData as any).subscribe({
          next: (pago) => {

            //limpiamos todo, por si quiere hacer otro pago
            this.selectedFileName = ''
            this.selectedFile = null
            this.fileInput.nativeElement.value = '';
            this.user = new User();
            this.user.detalle_metodo_pago = this.paymentMethod

            //mandamos las instrucciones
            this.toastService.confirm('Pago esta en proceso', `
              Hola <b>${pago.nombre}</b>, tu pago está en proceso. Puede demorar hasta 24 horas. Al confirmarse,
              te enviaremos el comprobante y tus tickets a este correo: <b>${pago.correo} recuerda revisar en spam</b>.
              ¡Gracias por tu confianza!
            `).then(() => { })

            this.loading = false
          }, error: (err) => {

            this.selectedFileName = ''
            this.selectedFile = null
            this.fileInput.nativeElement.value = '';
            this.user = new User();
            this.user.detalle_metodo_pago = this.paymentMethod
            this.toastService.warning('Hubo un problema con el pago por favor vuelva a llenar los datos', err);
            this.loading = false
          },
        })
      }
    })
  }

  valideFormPay() {
    let pass = true

    if (!this.selectedFileName) {
      this.toastService.warning('Debe seleccionar el comprobante')
      pass = false
    }

    if (!this.user.nombre.trim()) {
      this.toastService.warning('Debe ingresar su nombre')
      pass = false
    }
    if (!this.user.referencia.trim()) {
      this.toastService.warning('Debe ingresar la referencia del pago')
      pass = false
    }

    if (!/^[0-9]+$/.test(this.user.telefono)) {
      this.toastService.warning('El teléfono debe contener solo números sin signos ni espacios')
      pass = false
    }
    if (this.user.cantidad_tickets < this.paymentMethod.min_tickets) {
      this.toastService.warning('El ticket no puede ser menor a ' + this.paymentMethod.min_tickets)
      pass = false
    }

    return pass
  }

  valideEmail() {
    if (this.user.correo !== this.user.confirm_correo) {
      this.toastService.warning('', 'El correo no coincide')
      this.user.confirm_correo = ''
    }
  }
  searchTikeByEmail() {
    this.rifasService.searchTikeByEmail(this.emailSearch).subscribe({
      next: (tikes) => {
        this.tickets = tikes

      },
      error(err) {

      },
    })
  }
}
