import { Component, Input } from '@angular/core';
import { Statistics } from 'src/app/interfaces/Statistics';

@Component({
  selector: 'app-card-statitics',
  templateUrl: './card-statitics.component.html',
  styleUrl: './card-statitics.component.css'
})
export class CardStatiticsComponent {
  @Input() statistic: Statistics = {
    id: 0,
    title: '',
    statistic: 0,
    icon: 'fa-solid fa-chart-line',
    col: 'md:col'
  }

  getTextSizeClass(text: string): string {
    const length = text.length;

    if (length >= 20) {
      return 'text-xs';
    } else {
      return 'text-4xl';
    }

  }
  parseValue(valor: string | number): string|number {
    // Convertimos a string por si es un número
    const valorStr = valor.toString();

    // Paso 1: Verificar si contiene el símbolo $
    const tieneDolar = valorStr.includes('$');

    // Si no tiene el símbolo $, retornar el valor original sin cambios
    if (!tieneDolar) {
      return valor;
    }

    // Paso 2: Quitar el símbolo $
    const valorSinDolar = valorStr.replace('$', '');

    // Paso 3: Convertir a número
    const numero = parseFloat(valorSinDolar);

    // Paso 4: Redondear a 2 decimales
    const numeroFormateado = numero.toFixed(2);

    // Paso 5: Agregar el símbolo $ nuevamente
    return `${numeroFormateado}$`;
  }

}
