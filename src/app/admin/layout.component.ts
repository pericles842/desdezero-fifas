import { Component, HostListener } from '@angular/core';
import { Menu } from '../interfaces/menu';
import { MENU } from './menu';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  esCelular: boolean = false
  menus: Menu[] = MENU

  ngOnInit() {
    this.onResize()
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

  /**
   * Activa el men  seleccionado y desactiva todos los dem s.
   * @param menu El men  a activar.
   */
  activeMenu(menu: Menu) {
    this.menus.forEach(m => m.active = false)
    menu.active = true
  }
}


