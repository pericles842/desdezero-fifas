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
    }else {
      return 'text-4xl';
    }

  }

}
