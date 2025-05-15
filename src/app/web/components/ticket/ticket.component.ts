import { Component, Input } from '@angular/core';
import { Ticket } from 'src/app/interfaces/Ticket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  @Input() ticket: Ticket = new Ticket();

}
