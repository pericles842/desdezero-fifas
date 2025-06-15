import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Awards } from 'src/app/models/rifa.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-award',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-award.component.html',
  styleUrl: './card-award.component.css'
})
export class CardAwardComponent {
  @Input() award: Awards = new Awards()
  host: string = environment.host
}
