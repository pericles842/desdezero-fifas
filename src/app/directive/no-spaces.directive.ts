import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoSpaces]'
})
export class NoSpacesDirective {

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    event.target.value = event.target.value.replace(/\s+/g, '');
  }
}
