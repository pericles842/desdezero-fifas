import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RifasService } from 'src/app/service/rifas.service';
import { ToastService } from 'src/app/service/toast.service';

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

  @Input() activate_rifa: boolean = false
}
