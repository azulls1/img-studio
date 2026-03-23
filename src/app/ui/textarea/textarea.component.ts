import { Component, Input, Output, EventEmitter } from '@angular/core';         // ← Inputs, Outputs y EventEmitter
import { CommonModule } from '@angular/common';                                 // ← Directivas comunes

@Component({
  selector: 'ui-textarea',                                                      // ← Selector del componente
  standalone: true,                                                             // ← Standalone component
  imports: [CommonModule],                                                      // ← Módulos necesarios
  template: `
    <textarea
      [id]="id"
      [attr.placeholder]="placeholder"
      [attr.maxlength]="maxLength"
      [rows]="rows"
      [disabled]="disabled"
      class="w-full rounded-xl border border-gray-300 p-3 text-ianavy focus:outline-none focus:ring-2 focus:ring-iagold disabled:opacity-60"
      (input)="onInput($event)"
      [value]="model"
      data-testid="ui-textarea">
    </textarea>
    <div class="mt-1 text-xs text-gray-300" *ngIf="maxLength">Máx. {{maxLength}} caracteres</div>
  `,
})
export class UiTextareaComponent {
  @Input() id!: string;                                                         // ← ID HTML requerido
  @Input() placeholder?: string;                                                // ← Placeholder opcional
  @Input() maxLength?: number = 1200;                                          // ← Límite de caracteres por defecto
  @Input() rows?: number = 6;                                                  // ← Número de filas por defecto
  @Input() disabled?: boolean = false;                                         // ← Estado deshabilitado por defecto
  @Input() model: string = '';                                                 // ← Modelo de datos (two-way binding)

  @Output() modelChange = new EventEmitter<string>();                          // ← Emisión de cambios del modelo

  onInput(event: Event): void {                                                // ← Método para manejar input
    const target = event.target as HTMLTextAreaElement;                        // ← Obtiene el elemento textarea
    this.model = target.value;                                                 // ← Actualiza el modelo
    this.modelChange.emit(this.model);                                         // ← Emite el cambio
  }
}
