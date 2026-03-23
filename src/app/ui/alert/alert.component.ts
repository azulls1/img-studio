import { Component, Input } from '@angular/core';                               // ← Inputs para props
import { CommonModule } from '@angular/common';                                 // ← Directivas comunes

@Component({
  selector: 'ui-alert',                                                        // ← Selector del componente
  standalone: true,                                                             // ← Standalone component
  imports: [CommonModule],                                                      // ← Módulos necesarios
  template: `
    <div
      [ngClass]="type === 'error' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-blue-50 text-blue-700 border-blue-200'"
      class="p-4 rounded-xl border"
      role="alert"
      aria-live="assertive"
      data-testid="ui-alert">
      {{ message }}                                                             <!-- Mensaje del alert -->
    </div>
  `,
})
export class UiAlertComponent {
  @Input() type: 'error' | 'info' = 'info';                                   // ← Tipo de alert por defecto
  @Input() message!: string;                                                   // ← Mensaje del alert (requerido)
}

