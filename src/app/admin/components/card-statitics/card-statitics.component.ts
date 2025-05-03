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
    col:'md:col'
  }
}
