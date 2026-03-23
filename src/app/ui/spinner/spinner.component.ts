import { Component, Input } from '@angular/core';                               // ← Inputs para props
import { CommonModule } from '@angular/common';                                 // ← Directivas comunes

@Component({
  selector: 'ui-spinner',                                                      // ← Selector del componente
  standalone: true,                                                             // ← Standalone component
  imports: [CommonModule],                                                      // ← Módulos necesarios
  template: `
    <svg
      class="animate-spin"
      [ngClass]="'h-' + size + ' w-' + size"
      viewBox="0 0 24 24"
      fill="none"
      role="progressbar"
      aria-valuetext="Cargando"
      data-testid="ui-spinner">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>  <!-- Círculo exterior -->
      <path class="opacity-75" d="M4 12a8 8 0 018-8v4" fill="currentColor"></path>                        <!-- Path de animación -->
    </svg>
  `,
})
export class UiSpinnerComponent {
  @Input() size?: string = '5';                                               // ← Tamaño del spinner por defecto
}

