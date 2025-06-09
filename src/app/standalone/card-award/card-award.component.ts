import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Awards } from 'src/app/models/rifa.model';

@Component({
  selector: 'app-card-award',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-award.component.html',
  styleUrl: './card-award.component.css'
})
export class CardAwardComponent {
  @Input() award: Awards = new Awards()
}
