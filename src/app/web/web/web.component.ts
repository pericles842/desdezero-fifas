import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrl: './web.component.scss'
})
export class WebComponent {
  @ViewChild('rifas') rifas!: ElementRef;
  
  esCelular = window.innerWidth < 768;
  loading = true;
  rangeValue = 30;
  price_ticket: number = 10;
  quantity_tickets: number = 1;



  irASeccion() {
    this.rifas.nativeElement.scrollIntoView({ behavior: 'smooth' });
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

}
