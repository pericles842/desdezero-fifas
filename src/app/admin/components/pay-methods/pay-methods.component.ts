import { ChangeDetectorRef, Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { CategoryPay } from 'src/app/interfaces/PaymentMethods';
import { PayMethod } from 'src/app/models/pay_method';
import { PayService } from 'src/app/service/pay.service';
import { ToastService } from 'src/app/service/toast.service';
import { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-pay-methods',
  templateUrl: './pay-methods.component.html',
  styleUrl: './pay-methods.component.css'
})
export class PayMethodsComponent {

  @ViewChild('pagomovil') pagomovil!: TemplateRef<any>;
  @ViewChild('transferencia') transferencia!: TemplateRef<any>;
  @ViewChild('billeteradigital') billeteradigital!: TemplateRef<any>;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  visible: boolean = false;
  loading: boolean = false

  selectedFile: File | null = null;
  selectedFileName: string | null = null;

  categoryBank: CategoryPay[] = [
    {
      id: 1,
      name: 'Pago Movil',
      key: 'pagomovil',
      key_template: this.pagomovil,
      active: true
    },
    {
      id: 2,
      name: 'Transferencia',
      key_template: this.transferencia,
      key: 'transferencia',
      active: false
    },
    {
      id: 3,
      name: 'Billetera digital',
      key_template: this.billeteradigital,
      key: 'billeteradigital',
      active: false
    }
  ];
  selectCategory: CategoryPay | any
  pay: PayMethod = new PayMethod()
  litsPay!: PayMethod[]
  constructor(
    private cdRef: ChangeDetectorRef,
    private payService: PayService,
    private toastService: ToastService
  ) { }

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
  ngAfterViewInit() {

    //SETAEMOS LOS VALORES DE LOS TEMPLATES CUANDO CARGUE LA VISTA
    this.categoryBank.forEach(cb => {
      const template = this[cb.key as keyof this] as unknown;
      if (template instanceof TemplateRef) {
        cb.key_template = template;
      }
    });

    //etemamos el primer valor del arreglo y forzamos la carga
    this.selectCategory = this.categoryBank[0]
    this.changeCategoryPay(this.selectCategory)
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.loading = true
    this.payService.listPayMethod().subscribe({
      next: (payMethods) => {
        this.litsPay = payMethods
        this.loading = false
      }, error: (err) => {
        this.toastService.error('',err)
        this.loading = false
      },
    })
  }
  changeCategoryPay(pay: CategoryPay): void {
    if (this.pay.id != 0 && pay.key != this.pay.tipo)
      return this.toastService.warning('No se puede cambiar el tipo de pago cuando esta creado', 'Advertencia') as any
    //asignamos el tipo que seleccionemos en el modelo del formulario
    this.pay.tipo = pay.key
    this.categoryBank.forEach(p => p.active = false)
    pay.active = true


    if (this.pay.id == 0) {
      //borramos los datos de los damos metodos si se cambia a otro SOLO EN CREAR *
      this.pay.datos = {}

      if (pay.key == 'transferencia') {
        this.pay.datos.type_person = 'Persona Natural';
        this.pay.datos.cuenta = 'Corriente';
      } else if (pay.key == 'pagomovil') {
        this.pay.datos.type_person = 'Persona Natural'
      }
    }

    this.selectCategory = pay

  }

  openModal() {
    this.pay = new PayMethod()
    this.selectedFileName = ''
    this.selectCategory = this.categoryBank[0]
    this.changeCategoryPay(this.selectCategory)
    this.visible = true
  }

  createPay() {
    if (!this.validatePay()) return
    this.loading = true

    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    formData.append('pay', JSON.stringify(this.pay))

    this.payService.createPayMethod(formData as any).subscribe({
      next: (res) => {

        if (this.pay.id == 0) this.litsPay.push(res)
        this.toastService.success('Método de pago creado exitosamente')
        this.loading = false
        this.visible = false
      },
      error: (err) => {
        this.loading = false
        this.toastService.error('', err)
      }
    })

  }

  setPay(pay: PayMethod) {
    this.pay = pay
    this.selectedFileName = pay.url_img.split('/')[pay.url_img.split('/').length - 1].toString()
    this.selectCategory = this.categoryBank.find(b => b.key == pay.tipo)
    this.changeCategoryPay(this.selectCategory)
    this.visible = true
  }

  deletePayMethod(id: number) {

    this.toastService.confirm('Seguro desea eliminar el método de pago', '').then((res: SweetAlertResult) => {
      if (res.isConfirmed) {
        this.loading = true
        this.payService.deletePayMethod(id).subscribe({
          next: (value) => {
            let index = this.litsPay.findIndex(p => p.id == id)
            this.litsPay.splice(index, 1)
            this.loading = false
            this.toastService.success('Método de pago eliminado exitosamente')
          },
          error: (err) => {
            this.loading = false
            this.toastService.error('', err)
          },
        })
      }
    })
  }


  validatePay() {
    let valid = true

    if (!this.pay.nombre) {
      this.toastService.error('El nombre del método de pago es requerido')
      valid = false
    }

    if (!this.pay.titular) {
      this.toastService.error('El titular del método de pago es requerido')
      valid = false
    }

    if (!this.selectedFileName) {
      this.toastService.error('Seleccione una imagen para el método de pago')
      valid = false
    }


    if (this.pay.min_tickets <= 0) {
      this.toastService.error('El minimo de 1 ticket es requerido')
      valid = false
    }

    return valid
  }


  closeModal() {
    this.visible = false
    this.selectedFileName = ''
    this.selectedFile = null
    this.fileInput.nativeElement.value = '';
  }
}
