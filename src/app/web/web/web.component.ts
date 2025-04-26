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

  ngOnInit() {
    const fontReady = document.fonts.ready;

    const themeLink = document.getElementById('theme-link') as HTMLLinkElement;
    const faScript = document.getElementById('bootstrap-css') as HTMLScriptElement;

    const waitForTheme = new Promise<void>((resolve, reject) => {
      if (themeLink.sheet) {
        resolve();
      } else {
        themeLink.onload = () => resolve();
        themeLink.onerror = () => reject('❌ Error cargando el CSS del tema');
        this.loading = false;
      }
    });

    const waitForFA = new Promise<void>((resolve, reject) => {
      if ((window as any).FontAwesome) {
        resolve();
      } else {
        faScript.onload = () => resolve();
        faScript.onerror = () => reject('❌ Error cargando FontAwesome');
        this.loading = false;
      }
    });

    Promise.all([fontReady, waitForTheme, waitForFA])
      .then(() => {
        this.loading = false;
         
      })
      .catch(err => {
        console.error(err);
        this.loading = false;
      });
  }


}
