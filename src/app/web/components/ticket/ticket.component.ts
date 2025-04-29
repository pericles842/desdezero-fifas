import { Component, Input } from '@angular/core';
import { Ticket } from 'src/app/interfaces/Ticket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  @Input() ticket: Ticket = {
    id: 'T-12345',
    title: 'Automóvil Toyota Corolla 2024',
    name: 'Juan Pérez',
    email: 'juan@ejemplo.com',
    phone: 4124050431,
    date: '15/04/2024',
    status: 'aprobado'
  };

}
