import { Component, Input } from '@angular/core';                               // ← Inputs para props
import { CommonModule } from '@angular/common';                                 // ← Directivas comunes

@Component({
  selector: 'ui-label',                                                         // ← Selector del componente
  standalone: true,                                                             // ← Standalone component
  imports: [CommonModule],                                                      // ← Módulos necesarios
  template: `
    <label
      [for]="forId"
      class="block text-sm font-medium text-white"
      [attr.aria-required]="required ? 'true' : null"
      data-testid="ui-label">
      {{ text }}<span *ngIf="required" class="text-iagold ml-1">*</span>        <!-- Asterisco para campos requeridos -->
    </label>
  `,
})
export class UiLabelComponent {
  @Input() forId!: string;                                                      // ← ID del control al que apunta (requerido)
  @Input() text!: string;                                                       // ← Texto visible de la etiqueta (requerido)
  @Input() required?: boolean;                                                  // ← Indica si el campo es requerido (opcional)
}

