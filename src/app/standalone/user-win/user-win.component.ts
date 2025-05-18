import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { winUser } from 'src/app/models/rifa.model';

@Component({
  selector: 'app-user-win',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-win.component.html',
  styleUrl: './user-win.component.css'
})
export class UserWinComponent {
  @Input() win: winUser = new winUser()
  @Input() telefono: string = ''
}
