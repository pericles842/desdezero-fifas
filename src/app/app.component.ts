import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'desdezero';

  // Aquí puedes almacenar el tema actual
  currentTheme: string = 'light'; // Valor inicial
  loading: boolean = true;

  switchTheme(themeName: string): void {
    const themeLink = document.getElementById('theme-link') as HTMLLinkElement;

    // Cambiar el archivo CSS de tema
    themeLink.href = `assets/theme/${themeName}.css`;
  }


}
