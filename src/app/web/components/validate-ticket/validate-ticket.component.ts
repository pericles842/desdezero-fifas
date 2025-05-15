import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-validate-ticket',
  templateUrl: './validate-ticket.component.html',
  styleUrl: './validate-ticket.component.css'
})
export class ValidateTicketComponent {
  
  @Output() touchSearch = new EventEmitter<void>();
  @Input() search: string = '';
  @Output() searchChange = new EventEmitter<string>(); // nombre clave para [(search)]

  internalSearch: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['search']) {
      this.internalSearch = this.search;
    }
  }

  onInputChange(value: string) {
    this.searchChange.emit(value); // notifica al padre
  }
}

