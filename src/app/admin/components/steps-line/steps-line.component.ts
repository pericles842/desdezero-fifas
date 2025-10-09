import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-steps-line',
  standalone: true,
  imports: [],
  templateUrl: './steps-line.component.html',
  styleUrl: './steps-line.component.css',
})
export class StepsLineComponent {
  @Input() step: number = 0;
  @Input() title: string = 'Formulario de prueba';
}
