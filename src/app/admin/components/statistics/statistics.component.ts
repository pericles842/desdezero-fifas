import { Component } from '@angular/core';
import { Statistics } from 'src/app/interfaces/Statistics';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  statistics: Statistics[] = [
    {
      id: 1,
      title: 'Participantes',
      statistic: 1000,
      icon: 'fa-solid fa-user',
      col:'md:col-4'
    },
    {
      id: 2,
      title: 'Tickets Vendidos',
      statistic: 100,
      icon: 'fa-solid fa-ticket',
      col:'md:col-4'
    },
    {
      id: 3,
      title: 'Total Recaudado',
      statistic: 128,
      icon: 'fa-solid fa-money-bill-trend-up',
      col:'md:col-4'
    }
  ]
}
