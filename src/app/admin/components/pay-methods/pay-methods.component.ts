import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { CategoryPay } from 'src/app/interfaces/PaymentMethods';

@Component({
  selector: 'app-pay-methods',
  templateUrl: './pay-methods.component.html',
  styleUrl: './pay-methods.component.css'
})
export class PayMethodsComponent {

  @ViewChild('pagomovil') pagomovil!: TemplateRef<any>;
  @ViewChild('transferencia') transferencia!: TemplateRef<any>;
  @ViewChild('billeteradigital') billeteradigital!: TemplateRef<any>;

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

  constructor(private cdRef: ChangeDetectorRef) { }


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
    this.cdRef.detectChanges();
  }
  changeCategoryPay(pay: CategoryPay) {
    this.categoryBank.forEach(p => p.active = false)
    pay.active = true

    this.selectCategory = pay

  }
}
