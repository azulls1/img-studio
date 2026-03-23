import { Component, Input, Output, EventEmitter } from '@angular/core';         // ← Inputs, Outputs y EventEmitter
import { CommonModule } from '@angular/common';                                 // ← Directivas comunes

@Component({
  selector: 'ui-button',                                                        // ← Selector del componente
  standalone: true,                                                             // ← Standalone component
  imports: [CommonModule],                                                      // ← Módulos necesarios
  template: `
    <button
      type="button"
      class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-iagold text-ianavy font-semibold hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition"
      [disabled]="disabled || loading"
      (click)="onClick()"
      data-testid="ui-button">
      <span *ngIf="!loading">{{ label }}</span>
      <span *ngIf="loading" class="flex items-center gap-2">
        <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" d="M4 12a8 8 0 018-8v4" fill="currentColor"></path>
        </svg>
        Generando...
      </span>
    </button>
  `,
})
export class UiButtonComponent {
  @Input() label: string = 'Generar Imagen';                                   // ← Texto del botón por defecto
  @Input() loading?: boolean = false;                                          // ← Estado de carga por defecto
  @Input() disabled?: boolean = false;                                         // ← Estado deshabilitado por defecto

  @Output() clicked = new EventEmitter<void>();                               // ← Emisión del evento click

  onClick(): void {                                                            // ← Método para manejar click
    if (!this.disabled && !this.loading) {                                     // ← Solo emite si no está deshabilitado
      this.clicked.emit();                                                     // ← Emite el evento
    }
  }
}
