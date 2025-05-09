import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header-buttons',
  templateUrl: './header-buttons.component.html',
  styleUrl: './header-buttons.component.css'
})
export class HeaderButtonsComponent {

  @Output() touchCreate: EventEmitter<any> = new EventEmitter<any>();
  @Output() touchSearch: EventEmitter<any> = new EventEmitter<any>();
  @Output() touchDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() touchUpdate: EventEmitter<any> = new EventEmitter<any>();
}
