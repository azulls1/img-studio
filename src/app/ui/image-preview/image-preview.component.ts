import { Component, Input } from '@angular/core';                               // ← Inputs para props
import { CommonModule } from '@angular/common';                                 // ← Directivas comunes
import { SafeUrl } from '@angular/platform-browser';                            // ← Tipo SafeUrl para URLs seguras

@Component({
  selector: 'ui-image-preview',                                               // ← Selector del componente
  standalone: true,                                                             // ← Standalone component
  imports: [CommonModule],                                                      // ← Módulos necesarios
  template: `
    <figure class="space-y-2" data-testid="ui-image-preview">                 <!-- Contenedor figure -->
      <img
        [src]="src"
        [alt]="alt"
        class="rounded-xl shadow-lg mx-auto"
        [ngStyle]="{ 'max-height': maxHeight }" />                             <!-- Imagen con altura máxima -->
      <figcaption class="text-xs text-gray-300 text-center">{{ alt }}</figcaption>  <!-- Descripción de la imagen -->
    </figure>
  `,
})
export class UiImagePreviewComponent {
  @Input() src!: string | SafeUrl;                                            // ← URL de la imagen (requerido)
  @Input() alt?: string = 'Imagen generada';                                  // ← Texto alternativo por defecto
  @Input() maxHeight?: string = '600px';                                      // ← Altura máxima por defecto
}

