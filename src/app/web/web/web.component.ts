import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrl: './web.component.scss'
})
export class WebComponent {
  esCelular = window.innerWidth < 768;
  loading = true;


  @HostListener('window:resize')
  onResize() {
    this.esCelular = window.innerWidth < 768;
  }

  


}
