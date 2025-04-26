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


  async ngOnInit() {
    try {
      const [fonts, theme, fa] = await Promise.all([
        fetch('https://fonts.googleapis.com/css2?family=Cal+Sans&family=Geist:wght@100..900&display=swap'),
        fetch('assets/theme/light-theme.css'),
        fetch('https://kit.fontawesome.com/da29abc60a.js')
      ]);

      if (!fonts.ok || !theme.ok || !fa.ok) {
        this.loading = false;
        throw new Error('❌ Alguno de los recursos no se pudo cargar');
      }

      this.loading = false;
      // Aquí podrías continuar con tu lógica
    } catch (err) {
      this.loading = false;
      console.error('Error detectado:', err);
    }
  }
}
