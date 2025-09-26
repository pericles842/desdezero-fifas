import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-validate-ticket',
  templateUrl: './validate-ticket.component.html',
  styleUrl: './validate-ticket.component.css',
})
export class ValidateTicketComponent {
  @Input() set search(value: string) {
    this.internalSearch = value;
  }
  @Output() searchChange = new EventEmitter<string>(); // para [(search)]
  @Output() touchSearch = new EventEmitter<void>(); // para el botón

  internalSearch: string = '';

  onInputChange(value: string) {
    this.searchChange.emit(value); // actualiza al padre
  }

  onTouchSearch() {
    this.touchSearch.emit(); // dispara evento al padre
  }
}
