import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[customRipple]',
})
export class RippleDirective {
  @Input() rippleColor: string = '#d4a017';
  @Input() rippleDuration: number = 600; // en ms

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Asegura el contexto correcto para el efecto
    const nativeEl = this.el.nativeElement;
    this.renderer.setStyle(nativeEl, 'position', 'relative');
    this.renderer.setStyle(nativeEl, 'overflow', 'hidden');
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const element = this.el.nativeElement;
    const ripple = this.renderer.createElement('span');

    // Estilos base del ripple
    this.renderer.setStyle(ripple, 'position', 'absolute');
    this.renderer.setStyle(ripple, 'border-radius', '50%');
    this.renderer.setStyle(ripple, 'transform', 'scale(0)');
    this.renderer.setStyle(ripple, 'opacity', '0.75');
    this.renderer.setStyle(ripple, 'pointer-events', 'none');
    this.renderer.setStyle(ripple, 'background-color', this.rippleColor);
    this.renderer.setStyle(ripple, 'width', '20px');
    this.renderer.setStyle(ripple, 'height', '20px');
    this.renderer.setStyle(
      ripple,
      'transition',
      `transform ${this.rippleDuration}ms ease-out, opacity ${this.rippleDuration}ms ease-out`
    );

    // Calcular posición del clic
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    this.renderer.setStyle(ripple, 'width', `${size}px`);
    this.renderer.setStyle(ripple, 'height', `${size}px`);
    this.renderer.setStyle(ripple, 'left', `${x}px`);
    this.renderer.setStyle(ripple, 'top', `${y}px`);

    // Insertar el ripple
    this.renderer.appendChild(element, ripple);

    // Forzar el reflow para activar transición
    void ripple.offsetWidth;

    // // Iniciar animación
    // this.renderer.setStyle(ripple, 'transform', 'scale(1)');
    // this.renderer.setStyle(ripple, 'opacity', '0');

    //  Hazlo en el siguiente tick del event loop
    setTimeout(() => {
      this.renderer.setStyle(ripple, 'transform', 'scale(1)');
      this.renderer.setStyle(ripple, 'opacity', '0');
    });

    // Remover el ripple al terminar la animación
    setTimeout(() => {
      this.renderer.removeChild(element, ripple);
    }, this.rippleDuration);
  }
}
