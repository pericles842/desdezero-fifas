import { Component } from '@angular/core';

@Component({
  selector: 'app-rifas-form',
  templateUrl: './rifas-form.component.html',
  styleUrl: './rifas-form.component.css'
})
export class RifasFormComponent {

  selectedFileName: string = '';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFileName = input.files[0].name;
    } else {
      this.selectedFileName = '';
    }
  }

}
