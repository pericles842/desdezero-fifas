import { Component, Input } from '@angular/core';
import { Column } from 'src/app/interfaces/columns';

@Component({
  selector: 'app-minimal-table',
  templateUrl: './minimal-table.component.html',
  styleUrl: './minimal-table.component.css'
})
export class MinimalTableComponent {
  @Input() cols!: Column[];
  @Input() data: any[] = []
}
